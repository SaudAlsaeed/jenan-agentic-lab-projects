import { useLocale } from '@/i18n/LocaleContext';

export function TrustHighlights() {
  const { t } = useLocale();

  return (
    <section
      id="trust"
      className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--section-y)]"
      aria-labelledby="trust-title"
    >
      <h2
        id="trust-title"
        className="font-display mb-10 text-[length:var(--text-section)] font-bold"
      >
        {t.trust.title}
      </h2>
      <ul className="grid gap-8 md:grid-cols-3 md:gap-0">
        {t.trust.items.map((item, i) => (
          <li
            key={item.title}
            className={`md:px-6 ${i > 0 ? 'md:border-s md:border-[var(--line)]' : ''} first:md:ps-0 last:md:pe-0`}
          >
            <h3 className="font-display mb-2 text-lg font-semibold text-[var(--accent-sand)]">
              {item.title}
            </h3>
            <p className="text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-muted)]">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
