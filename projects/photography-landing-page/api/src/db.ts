import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import {
  DEFAULT_INQUIRY_STATUS,
  type InquiryStatus,
  type ServiceType,
} from './constants.js';
import type {
  AdminUser,
  CreateInquiryInput,
  Inquiry,
  InquiryFilters,
} from './types.js';

type InquiryRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  date: string | null;
  preferred_time: string | null;
  location: string | null;
  details: string | null;
  status: string;
  internal_notes: string | null;
  telegram_sent: number;
  created_at: string;
  updated_at: string;
};

function mapRow(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    service: row.service as ServiceType,
    date: row.date,
    preferredTime: row.preferred_time,
    location: row.location,
    details: row.details,
    status: row.status as InquiryStatus,
    internalNotes: row.internal_notes,
    telegramSent: Boolean(row.telegram_sent),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class InquiryStore {
  readonly db: Database.Database;

  constructor(databasePath: string) {
    const dir = path.dirname(databasePath);
    fs.mkdirSync(dir, { recursive: true });
    this.db = new Database(databasePath);
    this.db.pragma('journal_mode = WAL');
    this.migrate();
  }

  private migrate(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        service TEXT NOT NULL,
        date TEXT,
        preferred_time TEXT,
        location TEXT,
        details TEXT,
        status TEXT NOT NULL,
        internal_notes TEXT,
        telegram_sent INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
      CREATE INDEX IF NOT EXISTS idx_inquiries_service ON inquiries(service);

      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
  }

  ensureAdminUser(username: string, password: string): void {
    const existing = this.db
      .prepare('SELECT id FROM admin_users WHERE username = ?')
      .get(username);
    if (existing) return;

    const now = new Date().toISOString();
    const passwordHash = bcrypt.hashSync(password, 10);
    this.db
      .prepare(
        `INSERT INTO admin_users (id, username, password_hash, created_at)
         VALUES (@id, @username, @passwordHash, @createdAt)`,
      )
      .run({
        id: randomUUID(),
        username,
        passwordHash,
        createdAt: now,
      });
  }

  findAdminByUsername(username: string): AdminUser | null {
    const row = this.db
      .prepare(
        `SELECT id, username, password_hash AS passwordHash, created_at AS createdAt
         FROM admin_users WHERE username = ?`,
      )
      .get(username) as AdminUser | undefined;
    return row ?? null;
  }

  createInquiry(
    input: CreateInquiryInput,
    options: { telegramSent: boolean } = { telegramSent: false },
  ): Inquiry {
    const now = new Date().toISOString();
    const id = randomUUID();
    this.db
      .prepare(
        `INSERT INTO inquiries (
          id, name, phone, email, service, date, preferred_time, location,
          details, status, internal_notes, telegram_sent, created_at, updated_at
        ) VALUES (
          @id, @name, @phone, @email, @service, @date, @preferredTime, @location,
          @details, @status, NULL, @telegramSent, @createdAt, @updatedAt
        )`,
      )
      .run({
        id,
        name: input.name,
        phone: input.phone,
        email: input.email ?? null,
        service: input.service,
        date: input.date ?? null,
        preferredTime: input.preferredTime ?? null,
        location: input.location ?? null,
        details: input.details ?? null,
        status: DEFAULT_INQUIRY_STATUS,
        telegramSent: options.telegramSent ? 1 : 0,
        createdAt: now,
        updatedAt: now,
      });
    return this.getInquiry(id)!;
  }

  markTelegramSent(id: string, sent: boolean): void {
    this.db
      .prepare(
        `UPDATE inquiries SET telegram_sent = ?, updated_at = ? WHERE id = ?`,
      )
      .run(sent ? 1 : 0, new Date().toISOString(), id);
  }

  getInquiry(id: string): Inquiry | null {
    const row = this.db
      .prepare('SELECT * FROM inquiries WHERE id = ?')
      .get(id) as InquiryRow | undefined;
    return row ? mapRow(row) : null;
  }

  listInquiries(filters: InquiryFilters = {}): Inquiry[] {
    const clauses: string[] = [];
    const params: Record<string, string> = {};

    if (filters.status) {
      clauses.push('status = @status');
      params.status = filters.status;
    }
    if (filters.service) {
      clauses.push('service = @service');
      params.service = filters.service;
    }
    if (filters.dateFrom) {
      clauses.push("substr(created_at, 1, 10) >= @dateFrom");
      params.dateFrom = filters.dateFrom;
    }
    if (filters.dateTo) {
      clauses.push("substr(created_at, 1, 10) <= @dateTo");
      params.dateTo = filters.dateTo;
    }
    if (filters.q) {
      clauses.push('(LOWER(name) LIKE @q OR phone LIKE @q)');
      params.q = `%${filters.q.toLowerCase()}%`;
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const rows = this.db
      .prepare(`SELECT * FROM inquiries ${where} ORDER BY created_at DESC`)
      .all(params) as InquiryRow[];
    return rows.map(mapRow);
  }

  updateStatus(id: string, status: InquiryStatus): Inquiry | null {
    const existing = this.getInquiry(id);
    if (!existing) return null;
    this.db
      .prepare(
        `UPDATE inquiries SET status = ?, updated_at = ? WHERE id = ?`,
      )
      .run(status, new Date().toISOString(), id);
    return this.getInquiry(id);
  }

  updateInternalNotes(id: string, internalNotes: string): Inquiry | null {
    const existing = this.getInquiry(id);
    if (!existing) return null;
    this.db
      .prepare(
        `UPDATE inquiries SET internal_notes = ?, updated_at = ? WHERE id = ?`,
      )
      .run(internalNotes, new Date().toISOString(), id);
    return this.getInquiry(id);
  }

  close(): void {
    this.db.close();
  }
}
