import { SITE } from '@/config/site';
import { useLocale } from '@/i18n/LocaleContext';
import { whatsappUrl } from '@/api/inquiries';

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-elevated)]">
      <div className="mx-auto flex max-w-[var(--content-max)] flex-col gap-6 px-[var(--pad-x)] py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display mb-2 text-lg font-bold">{t.brand}</p>
          <p className="font-ui text-[length:var(--text-label)] text-[var(--text-muted)]">
            {t.footer.city}
          </p>
        </div>
        <div>
          <p className="font-ui mb-2 text-[length:var(--text-label)] text-[var(--text-muted)]">
            {t.footer.contact}
          </p>
          <ul className="font-ui space-y-1 text-[length:var(--text-label)]">
            <li>
              <a
                href={`tel:${SITE.whatsappNumber}`}
                className="text-[var(--text-primary)] hover:text-[var(--accent-sand)]"
              >
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] hover:text-[var(--accent-sand)]"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-4 text-center">
        <p className="font-ui text-[length:var(--text-label)] text-[var(--text-muted)]">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
