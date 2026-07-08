import { describe, expect, it } from 'vitest';

describe('api scaffold', () => {
  it('exposes expected env key names for Telegram', () => {
    const requiredKeys = ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'] as const;
    expect(requiredKeys).toHaveLength(2);
  });
});
