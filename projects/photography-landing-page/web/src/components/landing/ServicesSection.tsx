import { Button } from '@/components/ui/Button';
import { useContactPrefill } from '@/context/ContactPrefillContext';
import type { ServiceType } from '@/config/site';
import { useLocale } from '@/i18n/LocaleContext';

export function ServicesSection() {
  const { t } = useLocale();
  const { requestContact } = useContactPrefill();

  return (
    <section
      id="services"
      className="border-y border-[var(--line)] bg-[var(--bg-elevated)]/40"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--section-y)]">
        <h2
          id="services-title"
          className="font-display mb-10 text-[length:var(--text-section)] font-bold"
        >
          {t.services.title}
        </h2>
        <ul className="grid gap-10 md:grid-cols-2">
          {t.services.items.map((item) => (
            <li key={item.id} className="border-s-2 border-[var(--accent-sand)]/40 ps-5">
              <h3 className="font-display mb-2 text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mb-3 text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-muted)]">
                {item.body}
              </p>
              <Button
                variant="ghost"
                className="!px-0"
                onClick={() =>
                  requestContact(
                    item.id === 'extra' ? undefined : (item.id as ServiceType),
                  )
                }
              >
                {t.services.inquire}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
