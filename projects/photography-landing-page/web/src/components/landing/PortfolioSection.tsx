import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { PortfolioCategory } from '@/config/site';
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_TAB_ORDER,
  type PortfolioItem,
} from '@/data/portfolio';
import { useLocale } from '@/i18n/LocaleContext';

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { t, locale } = useLocale();
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const titleId = useId();

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') (locale === 'ar' ? onNext : onPrev)();
      if (e.key === 'ArrowRight') (locale === 'ar' ? onPrev : onNext)();
      if (e.key === 'Tab') {
        // keep focus inside dialog (simple trap: only close + nav buttons)
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[data-lightbox-focus="true"]',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNext, onPrev, locale]);

  if (!item) return null;
  const alt = locale === 'ar' ? item.altAr : item.altEn;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <p id={titleId} className="sr-only">
        {alt}
      </p>
      <button
        ref={closeRef}
        type="button"
        data-lightbox-focus="true"
        className="font-ui absolute top-4 end-4 min-h-[var(--touch-min)] min-w-[var(--touch-min)] rounded-sm bg-[var(--bg-elevated)] px-3 text-[var(--text-primary)]"
        onClick={onClose}
        aria-label={t.portfolio.closeLightbox}
      >
        ✕
      </button>
      {items.length > 1 ? (
        <>
          <button
            type="button"
            data-lightbox-focus="true"
            className="font-ui absolute start-4 top-1/2 min-h-[var(--touch-min)] min-w-[var(--touch-min)] -translate-y-1/2 rounded-sm bg-[var(--bg-elevated)] text-[var(--text-primary)]"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label={t.portfolio.prev}
          >
            {locale === 'ar' ? '→' : '←'}
          </button>
          <button
            type="button"
            data-lightbox-focus="true"
            className="font-ui absolute end-4 top-1/2 min-h-[var(--touch-min)] min-w-[var(--touch-min)] -translate-y-1/2 rounded-sm bg-[var(--bg-elevated)] text-[var(--text-primary)]"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label={t.portfolio.next}
          >
            {locale === 'ar' ? '←' : '→'}
          </button>
        </>
      ) : null}
      <img
        src={item.src}
        alt={alt}
        className="max-h-[85vh] max-w-full object-contain animate-[fadeIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export function PortfolioSection() {
  const { t, locale } = useLocale();
  const [tab, setTab] = useState<PortfolioCategory>('events');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = PORTFOLIO_ITEMS.filter((i) => i.category === tab);

  const open = useCallback((idx: number) => setLightboxIndex(idx), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length,
    );
  }, [items.length]);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length));
  }, [items.length]);

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-[var(--content-max)] px-[var(--pad-x)] py-[var(--section-y)]"
      aria-labelledby="portfolio-title"
    >
      <h2
        id="portfolio-title"
        className="font-display mb-3 text-[length:var(--text-section)] font-bold"
      >
        {t.portfolio.title}
      </h2>
      <p className="mb-8 max-w-2xl text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-muted)]">
        {t.portfolio.intro}
      </p>

      <div
        role="tablist"
        aria-label={t.portfolio.title}
        className="font-ui mb-8 flex flex-wrap gap-1 border-b border-[var(--line)]"
      >
        {PORTFOLIO_TAB_ORDER.map((cat) => {
          const selected = tab === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              id={`tab-${cat}`}
              aria-selected={selected}
              aria-controls={`panel-${cat}`}
              tabIndex={selected ? 0 : -1}
              className={`min-h-[var(--touch-min)] border-b-2 px-4 text-[length:var(--text-label)] transition-colors ${
                selected
                  ? 'border-[var(--accent-sand)] text-[var(--accent-sand)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              onClick={() => setTab(cat)}
            >
              {t.portfolio.tabs[cat]}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="animate-[fadeIn_0.18s_ease-out]"
      >
        {items.length === 0 ? (
          <p className="text-[var(--text-muted)]">{t.portfolio.empty}</p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => {
              const alt = locale === 'ar' ? item.altAr : item.altEn;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="group relative block w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-sand)]"
                    onClick={() => open(idx)}
                    aria-label={`${t.portfolio.openImage}: ${alt}`}
                  >
                    <img
                      src={item.src}
                      alt={alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-110"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </section>
  );
}
