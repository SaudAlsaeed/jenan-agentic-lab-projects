import cors from 'cors';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import rateLimit from 'express-rate-limit';
import { ZodError } from 'zod';
import {
  authenticateAdmin,
  requireAdmin,
  signAdminToken,
} from './auth.js';
import {
  isTelegramConfigured,
  type AppConfig,
} from './config.js';
import type { InquiryStore } from './db.js';
import {
  sendInquiryTelegram,
  type TelegramSender,
} from './telegram.js';
import {
  createInquirySchema,
  listInquiriesQuerySchema,
  loginSchema,
  updateNotesSchema,
  updateStatusSchema,
} from './validation.js';

export type CreateAppOptions = {
  config: AppConfig;
  store: InquiryStore;
  telegramSender?: TelegramSender;
  /** Disable rate limit for tests. */
  disableRateLimit?: boolean;
};

function zodErrorResponse(err: ZodError) {
  return {
    error: 'Validation failed',
    details: err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  };
}

export function createApp(options: CreateAppOptions) {
  const { config, store, telegramSender } = options;
  const app = express();

  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: '32kb' }));

  const publicInquiryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many inquiries from this IP, please try again later.' },
  });

  app.get('/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'photography-landing-page-api',
      telegramConfigured: isTelegramConfigured(config),
      city: 'Riyadh',
      business: {
        ar: 'وكالة محمد السعيد للتصوير الإحترافي',
        en: 'Mohammed Alsaeed Agency for Professional Photography',
      },
    });
  });

  app.post(
    '/api/inquiries',
    options.disableRateLimit ? (_req, _res, next) => next() : publicInquiryLimiter,
    async (req, res, next) => {
      try {
        const parsed = createInquirySchema.safeParse(req.body);
        if (!parsed.success) {
          res.status(400).json(zodErrorResponse(parsed.error));
          return;
        }

        // Persist first, then notify (R-07/R-08). Telegram failures must never
        // fail the HTTP request — log and leave telegramSent=false for admin.
        const inquiry = store.createInquiry(parsed.data, {
          telegramSent: false,
        });

        let telegramSent = false;

        if (!isTelegramConfigured(config)) {
          console.error(
            '[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured',
            JSON.stringify({ inquiryId: inquiry.id }),
          );
        } else {
          try {
            const telegramResult = await sendInquiryTelegram({
              token: config.telegramBotToken,
              chatId: config.telegramChatId,
              input: parsed.data,
              sender: telegramSender,
            });

            if (!telegramResult.ok) {
              console.error(
                '[telegram] send failed',
                JSON.stringify({
                  inquiryId: inquiry.id,
                  status: telegramResult.status,
                  body: telegramResult.body,
                }),
              );
            } else {
              store.markTelegramSent(inquiry.id, true);
              telegramSent = true;
            }
          } catch (err) {
            console.error(
              '[telegram] send threw',
              JSON.stringify({
                inquiryId: inquiry.id,
                error: err instanceof Error ? err.message : String(err),
              }),
            );
          }
        }

        const result = store.getInquiry(inquiry.id)!;

        res.status(201).json({
          success: true,
          inquiry: result,
          telegramSent,
        });
      } catch (err) {
        next(err);
      }
    },
  );

  app.post('/api/admin/login', async (req, res, next) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json(zodErrorResponse(parsed.error));
        return;
      }

      const admin = await authenticateAdmin(
        store,
        parsed.data.username,
        parsed.data.password,
      );
      if (!admin) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const token = signAdminToken(config, admin);
      res.json({
        token,
        tokenType: 'Bearer',
        expiresIn: config.adminTokenTtl,
        admin: { id: admin.sub, username: admin.username },
      });
    } catch (err) {
      next(err);
    }
  });

  const admin = express.Router();
  admin.use(requireAdmin(config));

  admin.get('/me', (req, res) => {
    res.json({ admin: req.admin });
  });

  admin.get('/inquiries', (req, res) => {
    const parsed = listInquiriesQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json(zodErrorResponse(parsed.error));
      return;
    }
    const items = store.listInquiries(parsed.data);
    res.json({ items, total: items.length });
  });

  admin.get('/inquiries/:id', (req, res) => {
    const inquiry = store.getInquiry(req.params.id);
    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    res.json({ inquiry });
  });

  admin.patch('/inquiries/:id/status', (req, res) => {
    const parsed = updateStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json(zodErrorResponse(parsed.error));
      return;
    }
    const inquiry = store.updateStatus(req.params.id, parsed.data.status);
    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    res.json({ inquiry });
  });

  admin.patch('/inquiries/:id/notes', (req, res) => {
    const parsed = updateNotesSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json(zodErrorResponse(parsed.error));
      return;
    }
    const inquiry = store.updateInternalNotes(
      req.params.id,
      parsed.data.internalNotes,
    );
    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    res.json({ inquiry });
  });

  app.use('/api/admin', admin);

  app.use(
    (
      err: unknown,
      _req: Request,
      res: Response,
      _next: NextFunction,
    ) => {
      console.error('[api] unhandled error', err);
      res.status(500).json({ error: 'Internal server error' });
    },
  );

  return app;
}
