import { ContactForm } from '@/components/landing/ContactForm';
import { useLocale } from '@/i18n/LocaleContext';

export function ContactSection() {
  const { t } = useLocale();

  return (
    <section
      id="contact"
      className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--section-y)]"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-2xl">
        <h2
          id="contact-title"
          className="font-display mb-3 text-[length:var(--text-section)] font-bold"
        >
          {t.contact.title}
        </h2>
        <p className="mb-8 text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-muted)]">
          {t.contact.intro}
        </p>
        <div className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)]/60 p-5 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
