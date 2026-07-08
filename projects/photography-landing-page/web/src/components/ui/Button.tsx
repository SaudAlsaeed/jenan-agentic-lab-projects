import type { ReactNode } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import { useContactPrefill } from '@/context/ContactPrefillContext';

type Props = {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
};

const base =
  'font-ui inline-flex min-h-[var(--touch-min)] items-center justify-center rounded-sm px-5 text-[length:var(--text-label)] font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40';

const variants = {
  primary:
    'bg-[var(--accent-sand)] text-[var(--bg-void)] hover:bg-[var(--accent-sand-hover)] active:brightness-95',
  secondary:
    'border border-[var(--line)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]',
  ghost:
    'text-[var(--text-muted)] hover:text-[var(--text-primary)] underline-offset-4 hover:underline',
};

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export function BookCta({
  variant = 'primary',
  className,
  label,
}: {
  variant?: 'primary' | 'secondary';
  className?: string;
  label?: string;
}) {
  const { t } = useLocale();
  const { requestContact } = useContactPrefill();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => requestContact()}
    >
      {label ?? t.nav.book}
    </Button>
  );
}
