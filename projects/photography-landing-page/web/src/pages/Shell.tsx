/**
 * RTL shell stub — landing sections land in JEN-10.
 * Placeholders: A-01 mixed services, A-02 Arabic-only, A-04 typographic wordmark.
 */
export function Shell() {
  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)]">
      <a
        href="#main"
        className="font-ui sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--bg-elevated)] focus:px-3 focus:py-2 focus:text-[var(--accent-sand)]"
      >
        تخطي إلى المحتوى
      </a>

      <header className="border-b border-[var(--line)] bg-[var(--bg-elevated)]/90 backdrop-blur-sm">
        <div
          className="mx-auto flex max-w-[var(--content-max)] items-center justify-between px-[var(--pad-x)] py-4"
        >
          <p
            className="font-display text-[length:var(--text-wordmark)] font-bold tracking-wide"
          >
            [اسم الاستوديو]
          </p>
          <span className="font-ui text-[length:var(--text-label)] text-[var(--text-muted)]">
            هيكل تجريبي
          </span>
        </div>
      </header>

      <main
        id="main"
        className="relative mx-auto flex min-h-[70vh] max-w-[var(--content-max)] flex-col justify-center px-[var(--pad-x)] py-[var(--section-y)]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(196,165,116,0.08), transparent 60%)',
        }}
      >
        <p className="font-display mb-3 text-[length:var(--text-wordmark)] font-bold text-[var(--accent-sand)]">
          [اسم الاستوديو]
        </p>
        <h1
          className="font-display mb-4 max-w-3xl text-[length:var(--text-hero)] font-extrabold leading-[var(--leading-hero)]"
        >
          تصوير فوتوغرافي وفيديو احترافي
        </h1>
        <p
          className="mb-8 max-w-xl text-[length:var(--text-body)] leading-[var(--leading-body)] text-[var(--text-muted)]"
        >
          هيكل المشروع جاهز. الأقسام والنموذج ولوحة الإدارة تُبنى في المراحل
          التالية. النصوص والعلامة التجارية نهائية بعد تأكيد Q1–Q7.
        </p>
        <div className="flex flex-wrap gap-3">
          <span
            className="font-ui inline-flex min-h-[var(--touch-min)] items-center rounded-sm bg-[var(--accent-sand)] px-5 text-[length:var(--text-label)] font-medium text-[var(--bg-void)]"
          >
            احجز الآن
          </span>
          <span
            className="font-ui inline-flex min-h-[var(--touch-min)] items-center rounded-sm border border-[var(--line)] px-5 text-[length:var(--text-label)] text-[var(--text-primary)]"
          >
            شاهد الأعمال
          </span>
        </div>
      </main>

      <footer className="border-t border-[var(--line)] py-6 text-center">
        <p className="font-ui text-[length:var(--text-label)] text-[var(--text-muted)]">
          photography-landing-page · scaffold · JEN-9
        </p>
      </footer>
    </div>
  );
}
