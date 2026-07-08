import path from 'node:path';

function requiredInProduction(name: string, value: string | undefined): string {
  if (value) return value;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return '';
}

export type AppConfig = {
  port: number;
  databasePath: string;
  telegramBotToken: string;
  telegramChatId: string;
  /** HMAC secret for admin JWTs. */
  adminJwtSecret: string;
  /** Default admin username for first boot. */
  adminUsername: string;
  /** Plain password used only to seed/bootstrap the admin user when DB is empty. */
  adminPassword: string;
  /** JWT lifetime, e.g. "8h". */
  adminTokenTtl: string;
  corsOrigin: string | boolean;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const databasePath =
    env.DATABASE_PATH ??
    path.join(process.cwd(), 'data', 'inquiries.sqlite');

  return {
    port: Number(env.PORT ?? 3002),
    databasePath,
    telegramBotToken: env.TELEGRAM_BOT_TOKEN ?? '',
    telegramChatId: env.TELEGRAM_CHAT_ID ?? '',
    adminJwtSecret:
      requiredInProduction('ADMIN_JWT_SECRET', env.ADMIN_JWT_SECRET) ||
      'dev-only-admin-jwt-secret-change-me',
    adminUsername: env.ADMIN_USERNAME ?? 'admin',
    adminPassword: env.ADMIN_PASSWORD ?? 'changeme',
    adminTokenTtl: env.ADMIN_TOKEN_TTL ?? '8h',
    corsOrigin: env.CORS_ORIGIN ? env.CORS_ORIGIN : true,
  };
}

export function isTelegramConfigured(config: AppConfig): boolean {
  return Boolean(config.telegramBotToken && config.telegramChatId);
}
