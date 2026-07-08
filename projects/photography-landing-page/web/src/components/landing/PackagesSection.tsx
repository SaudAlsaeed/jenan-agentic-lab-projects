import { Button } from '@/components/ui/Button';
import { useContactPrefill } from '@/context/ContactPrefillContext';
import { useLocale } from '@/i18n/LocaleContext';

export function PackagesSection() {
  const { t } = useLocale();
  const { requestContact } = useContactPrefill();

  return (
    <section
      id="packages"
      className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--section-y)]"
      aria-labelledby="packages-title"
    >
      <h2
        id="packages-title"
        className="font-display mb-10 text-[length:var(--text-section)] font-bold"
      >
        {t.packages.title}
      </h2>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.packages.items.map((pkg) => (
          <li
            key={pkg.id}
            className="flex flex-col border-t border-[var(--line)] pt-6"
          >
            <h3 className="font-display mb-1 text-lg font-semibold">{pkg.name}</h3>
            <p className="font-ui mb-4 text-[length:var(--text-label)] text-[var(--accent-sand)]">
              {pkg.price}
            </p>
            <ul className="mb-6 flex-1 space-y-2 text-[length:var(--text-body)] text-[var(--text-muted)]">
              {pkg.includes.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[var(--accent-sand)]" aria-hidden>
                    ·
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="secondary"
              onClick={() => requestContact(pkg.servicePrefill)}
            >
              {t.packages.cta}
            </Button>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-[length:var(--text-label)] text-[var(--text-muted)]">
        {t.packages.disclaimer}
      </p>
    </section>
  );
}
