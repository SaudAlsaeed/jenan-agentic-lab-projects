import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { AppConfig } from './config.js';
import type { InquiryStore } from './db.js';

export type AuthPayload = {
  sub: string;
  username: string;
};

declare global {
  namespace Express {
    interface Request {
      admin?: AuthPayload;
    }
  }
}

export function signAdminToken(
  config: AppConfig,
  payload: AuthPayload,
): string {
  return jwt.sign(payload, config.adminJwtSecret, {
    expiresIn: config.adminTokenTtl as jwt.SignOptions['expiresIn'],
  });
}

export function verifyAdminToken(
  config: AppConfig,
  token: string,
): AuthPayload {
  const decoded = jwt.verify(token, config.adminJwtSecret) as AuthPayload;
  return { sub: decoded.sub, username: decoded.username };
}

export function requireAdmin(config: AppConfig) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const token = header.slice('Bearer '.length).trim();
    try {
      req.admin = verifyAdminToken(config, token);
      next();
    } catch {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
}

export async function authenticateAdmin(
  store: InquiryStore,
  username: string,
  password: string,
): Promise<AuthPayload | null> {
  const user = store.findAdminByUsername(username);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return null;
  return { sub: user.id, username: user.username };
}
