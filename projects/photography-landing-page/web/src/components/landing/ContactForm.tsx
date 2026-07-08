import {
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { submitInquiry } from '@/api/inquiries';
import { Button } from '@/components/ui/Button';
import type { ServiceType } from '@/config/site';
import { useContactPrefill } from '@/context/ContactPrefillContext';
import { useLocale } from '@/i18n/LocaleContext';

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: ServiceType | '';
  expectedDate: string;
  preferredTime: string;
  city: string;
  details: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  name: '',
  phone: '',
  email: '',
  service: '',
  expectedDate: '',
  preferredTime: '',
  city: '',
  details: '',
};

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15;
}

export function ContactForm() {
  const { t } = useLocale();
  const { prefillService, clearPrefill } = useContactPrefill();
  const formId = useId();
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );

  useEffect(() => {
    if (prefillService) {
      setValues((v) => ({ ...v, service: prefillService }));
      clearPrefill();
    }
  }, [prefillService, clearPrefill]);

  function validate(next: FormState): FieldErrors {
    const e: FieldErrors = {};
    if (!next.name.trim()) e.name = t.contact.required;
    if (!next.phone.trim()) e.phone = t.contact.required;
    else if (!isValidPhone(next.phone)) e.phone = t.contact.phoneInvalid;
    if (!next.service) e.service = t.contact.required;
    return e;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const order: (keyof FormState)[] = ['name', 'phone', 'service'];
      const first = order.find((k) => nextErrors[k]);
      if (first) {
        document.getElementById(`${formId}-${first}`)?.focus();
      }
      return;
    }

    setStatus('submitting');
    try {
      await submitInquiry({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || undefined,
        service: values.service as ServiceType,
        expectedDate: values.expectedDate || undefined,
        preferredTime: values.preferredTime.trim() || undefined,
        city: values.city.trim() || undefined,
        details: values.details.trim() || undefined,
      });
      setStatus('success');
      setValues(empty);
    } catch {
      setStatus('error');
    }
  }

  const fieldClass = (hasError: boolean) =>
    `w-full min-h-[var(--touch-min)] rounded-sm border bg-[var(--bg-void)] px-3 text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-sand)] ${
      hasError
        ? 'border-[var(--danger)]'
        : 'border-[var(--line)] hover:border-[var(--text-muted)]'
    }`;

  if (status === 'success') {
    return (
      <div
        className="rounded-sm border border-[var(--success)]/40 bg-[var(--bg-elevated)] p-8 text-center"
        role="status"
      >
        <h3 className="font-display mb-3 text-2xl font-bold text-[var(--success)]">
          {t.contact.successTitle}
        </h3>
        <p className="text-[length:var(--text-body)] leading-[var(--leading-body)]">
          {t.contact.success}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
      aria-busy={status === 'submitting'}
    >
      {status === 'error' ? (
        <div
          role="alert"
          className="rounded-sm border border-[var(--danger)]/50 bg-[var(--danger)]/10 px-4 py-3 text-[length:var(--text-body)] text-[var(--danger)]"
        >
          {t.contact.error}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label={t.contact.fields.name}
          required
          error={errors.name}
        >
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            className={fieldClass(Boolean(errors.name))}
            value={values.name}
            disabled={status === 'submitting'}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          />
        </Field>

        <Field
          id={`${formId}-phone`}
          label={t.contact.fields.phone}
          required
          error={errors.phone}
        >
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={fieldClass(Boolean(errors.phone))}
            value={values.phone}
            disabled={status === 'submitting'}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          />
        </Field>

        <Field id={`${formId}-email`} label={t.contact.fields.email}>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass(false)}
            value={values.email}
            disabled={status === 'submitting'}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </Field>

        <Field
          id={`${formId}-service`}
          label={t.contact.fields.service}
          required
          error={errors.service}
        >
          <select
            id={`${formId}-service`}
            name="service"
            className={fieldClass(Boolean(errors.service))}
            value={values.service}
            disabled={status === 'submitting'}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? `${formId}-service-err` : undefined
            }
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                service: e.target.value as ServiceType | '',
              }))
            }
          >
            <option value="">{t.contact.selectService}</option>
            {(
              Object.keys(t.contact.serviceOptions) as ServiceType[]
            ).map((key) => (
              <option key={key} value={key}>
                {t.contact.serviceOptions[key]}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${formId}-date`} label={t.contact.fields.date}>
          <input
            id={`${formId}-date`}
            name="expectedDate"
            type="date"
            className={fieldClass(false)}
            value={values.expectedDate}
            disabled={status === 'submitting'}
            onChange={(e) =>
              setValues((v) => ({ ...v, expectedDate: e.target.value }))
            }
          />
        </Field>

        <Field id={`${formId}-time`} label={t.contact.fields.time}>
          <input
            id={`${formId}-time`}
            name="preferredTime"
            className={fieldClass(false)}
            value={values.preferredTime}
            disabled={status === 'submitting'}
            onChange={(e) =>
              setValues((v) => ({ ...v, preferredTime: e.target.value }))
            }
          />
        </Field>

        <Field id={`${formId}-city`} label={t.contact.fields.city}>
          <input
            id={`${formId}-city`}
            name="city"
            className={fieldClass(false)}
            value={values.city}
            disabled={status === 'submitting'}
            onChange={(e) => setValues((v) => ({ ...v, city: e.target.value }))}
          />
        </Field>
      </div>

      <Field id={`${formId}-details`} label={t.contact.fields.details}>
        <textarea
          id={`${formId}-details`}
          name="details"
          rows={4}
          className={`${fieldClass(false)} min-h-[6rem] py-3`}
          value={values.details}
          disabled={status === 'submitting'}
          onChange={(e) =>
            setValues((v) => ({ ...v, details: e.target.value }))
          }
        />
      </Field>

      <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
        {status === 'submitting' ? (
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block size-4 animate-spin rounded-full border-2 border-[var(--bg-void)] border-t-transparent"
              aria-hidden
            />
            {t.contact.submitting}
          </span>
        ) : (
          t.contact.submit
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-ui mb-1.5 block text-[length:var(--text-label)] text-[var(--text-muted)]"
      >
        {label}
        {required ? (
          <span className="text-[var(--accent-sand)]" aria-hidden>
            {' '}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-err`}
          role="alert"
          className="mt-1 text-[length:var(--text-label)] text-[var(--danger)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
