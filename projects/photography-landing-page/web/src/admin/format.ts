/** Format ISO timestamps for Arabic admin UI (Gregorian, Riyadh). */

const dateTimeFmt = new Intl.DateTimeFormat('ar-SA-u-ca-gregory', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Riyadh',
});

const dateFmt = new Intl.DateTimeFormat('ar-SA-u-ca-gregory', {
  dateStyle: 'medium',
  timeZone: 'Asia/Riyadh',
});

export function formatDateTime(iso: string): string {
  try {
    return dateTimeFmt.format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatDateOnly(value: string | null): string {
  if (!value) return '—';
  try {
    // Prefer calendar date if YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return dateFmt.format(new Date(`${value}T12:00:00`));
    }
    return dateFmt.format(new Date(value));
  } catch {
    return value;
  }
}
