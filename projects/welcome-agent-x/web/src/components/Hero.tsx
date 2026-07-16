export function Hero() {
  return (
    <header className="hero" aria-labelledby="hero-brand">
      <div className="hero__atmosphere" aria-hidden="true">
        <div className="hero__x">
          <svg viewBox="0 0 200 200" fill="currentColor" role="presentation">
            <path d="M28 18 L100 100 L28 182 H52 L100 122 L148 182 H172 L100 100 L172 18 H148 L100 78 L52 18 H28Z" />
          </svg>
        </div>
      </div>

      <div className="hero__inner">
        <h1 id="hero-brand" className="hero__brand">
          Welcome Agent X
        </h1>
        <p className="hero__headline">Meet the squad that runs this workspace.</p>
        <p className="hero__support">Eight agents. Clear roles. One hello each.</p>
        <a className="hero__cta" href="#team">
          Meet the team
        </a>
      </div>
    </header>
  );
}
