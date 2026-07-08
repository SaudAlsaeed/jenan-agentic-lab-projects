import { useLocale } from '@/i18n/LocaleContext';

export function HowItWorks() {
  const { t } = useLocale();

  return (
    <section
      id="how"
      className="border-y border-[var(--line)] bg-[var(--bg-elevated)]/40"
      aria-labelledby="how-title"
    >
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--section-y)]">
        <h2
          id="how-title"
          className="font-display mb-10 text-[length:var(--text-section)] font-bold"
        >
          {t.how.title}
        </h2>
        <ol className="grid gap-8 md:grid-cols-4">
          {t.how.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                className="font-display mb-3 block text-3xl font-bold text-[var(--accent-sand)]"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mb-2 text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-muted)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
