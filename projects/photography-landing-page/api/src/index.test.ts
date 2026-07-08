import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';
import type { AppConfig } from './config.js';
import { InquiryStore } from './db.js';
import { formatInquiryTelegramMessage } from './telegram.js';

function makeConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return {
    port: 0,
    databasePath: '',
    telegramBotToken: 'test-token',
    telegramChatId: 'test-chat',
    adminJwtSecret: 'test-jwt-secret',
    adminUsername: 'admin',
    adminPassword: 'secret123',
    adminTokenTtl: '1h',
    corsOrigin: true,
    ...overrides,
  };
}

describe('formatInquiryTelegramMessage', () => {
  it('matches the brief template shape', () => {
    const text = formatInquiryTelegramMessage({
      name: 'Saud',
      phone: '+966500000000',
      email: 'saud@example.com',
      service: 'weddings_events',
      date: '2026-08-01',
      preferredTime: 'evening',
      location: 'Riyadh',
      details: 'Outdoor wedding',
    });
    expect(text).toContain('📸 New Photography Inquiry');
    expect(text).toContain('Name: Saud');
    expect(text).toContain('Phone: +966500000000');
    expect(text).toContain('Email: saud@example.com');
    expect(text).toContain('Location: Riyadh');
    expect(text).toContain('Outdoor wedding');
  });
});

describe('API inquiries + admin', () => {
  let tmpDir: string;
  let store: InquiryStore;
  let telegramCalls: Array<{ token: string; chatId: string; text: string }>;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'plp-api-'));
    store = new InquiryStore(path.join(tmpDir, 'test.sqlite'));
    store.ensureAdminUser('admin', 'secret123');
    telegramCalls = [];
  });

  afterEach(() => {
    store.close();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function buildApp(configOverrides: Partial<AppConfig> = {}) {
    const config = makeConfig({
      databasePath: path.join(tmpDir, 'test.sqlite'),
      ...configOverrides,
    });
    return createApp({
      config,
      store,
      disableRateLimit: true,
      telegramSender: async (token, chatId, text) => {
        telegramCalls.push({ token, chatId, text });
        return { ok: true, status: 200, body: '{"ok":true}' };
      },
    });
  }

  it('rejects missing required fields with 400 and does not notify', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/inquiries').send({
      name: '',
      phone: '',
      service: 'weddings_events',
    });
    expect(res.status).toBe(400);
    expect(telegramCalls).toHaveLength(0);
    expect(store.listInquiries()).toHaveLength(0);
  });

  it('creates inquiry, persists status جديد, and sends Telegram', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/inquiries').send({
      name: 'محمد',
      phone: '0501234567',
      email: 'client@example.com',
      service: 'video',
      date: '2026-09-10',
      preferredTime: 'صباحاً',
      location: 'الرياض',
      details: 'جلسة فيديو',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.telegramSent).toBe(true);
    expect(res.body.inquiry.status).toBe('جديد');
    expect(res.body.inquiry.telegramSent).toBe(true);
    expect(res.body.inquiry.location).toBe('الرياض');
    expect(telegramCalls).toHaveLength(1);
    expect(telegramCalls[0].token).toBe('test-token');
    expect(telegramCalls[0].chatId).toBe('test-chat');
    expect(telegramCalls[0].text).toContain('محمد');
  });

  it('keeps DB row and still returns 201 when Telegram fails', async () => {
    const config = makeConfig({
      databasePath: path.join(tmpDir, 'test.sqlite'),
    });
    const app = createApp({
      config,
      store,
      disableRateLimit: true,
      telegramSender: async () => ({
        ok: false,
        status: 500,
        body: 'fail',
      }),
    });

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(app).post('/api/inquiries').send({
      name: 'Fail Case',
      phone: '0509999999',
      service: 'portraits',
    });
    errorSpy.mockRestore();

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.telegramSent).toBe(false);
    expect(res.body.inquiry.telegramSent).toBe(false);
    const items = store.listInquiries();
    expect(items).toHaveLength(1);
    expect(items[0].telegramSent).toBe(false);
    expect(items[0].status).toBe('جديد');
  });

  it('persists and returns 201 when Telegram is not configured', async () => {
    const app = buildApp({
      telegramBotToken: '',
      telegramChatId: '',
    });

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(app).post('/api/inquiries').send({
      name: 'No Telegram',
      phone: '0508888888',
      service: 'video',
    });
    errorSpy.mockRestore();

    expect(res.status).toBe(201);
    expect(res.body.telegramSent).toBe(false);
    expect(telegramCalls).toHaveLength(0);
    expect(store.listInquiries()).toHaveLength(1);
  });

  it('persists and returns 201 when Telegram sender throws', async () => {
    const config = makeConfig({
      databasePath: path.join(tmpDir, 'test.sqlite'),
    });
    const app = createApp({
      config,
      store,
      disableRateLimit: true,
      telegramSender: async () => {
        throw new Error('network down');
      },
    });

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(app).post('/api/inquiries').send({
      name: 'Throw Case',
      phone: '0507777777',
      service: 'other',
    });
    errorSpy.mockRestore();

    expect(res.status).toBe(201);
    expect(res.body.telegramSent).toBe(false);
    expect(store.listInquiries()[0].telegramSent).toBe(false);
  });

  it('requires admin auth for list endpoint', async () => {
    const app = buildApp();
    const denied = await request(app).get('/api/admin/inquiries');
    expect(denied.status).toBe(401);

    const login = await request(app)
      .post('/api/admin/login')
      .send({ username: 'admin', password: 'secret123' });
    expect(login.status).toBe(200);
    const token = login.body.token as string;

    await request(app).post('/api/inquiries').send({
      name: 'A',
      phone: '0501111111',
      service: 'weddings_events',
    });
    await request(app).post('/api/inquiries').send({
      name: 'B',
      phone: '0502222222',
      service: 'portraits',
    });

    const list = await request(app)
      .get('/api/admin/inquiries')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(list.body.total).toBe(2);
    expect(list.body.items[0].createdAt >= list.body.items[1].createdAt).toBe(
      true,
    );

    const filtered = await request(app)
      .get('/api/admin/inquiries')
      .query({ service: 'portraits', q: '050222' })
      .set('Authorization', `Bearer ${token}`);
    expect(filtered.body.total).toBe(1);
    expect(filtered.body.items[0].name).toBe('B');
  });

  it('updates status workflow and internal notes', async () => {
    const app = buildApp();
    const created = await request(app).post('/api/inquiries').send({
      name: 'Notes Client',
      phone: '0503333333',
      service: 'weddings_events',
    });
    const id = created.body.inquiry.id as string;

    const login = await request(app)
      .post('/api/admin/login')
      .send({ username: 'admin', password: 'secret123' });
    const token = login.body.token as string;

    const statusRes = await request(app)
      .patch(`/api/admin/inquiries/${id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'تم التواصل' });
    expect(statusRes.status).toBe(200);
    expect(statusRes.body.inquiry.status).toBe('تم التواصل');

    const notesRes = await request(app)
      .patch(`/api/admin/inquiries/${id}/notes`)
      .set('Authorization', `Bearer ${token}`)
      .send({ internalNotes: 'Called client — waiting for deposit' });
    expect(notesRes.status).toBe(200);
    expect(notesRes.body.inquiry.internalNotes).toContain('deposit');

    const detail = await request(app)
      .get(`/api/admin/inquiries/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(detail.body.inquiry.status).toBe('تم التواصل');
    expect(detail.body.inquiry.internalNotes).toContain('deposit');
  });
});
