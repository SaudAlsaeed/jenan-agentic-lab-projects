import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import type { WelcomeCopy } from '@/types';

interface WelcomeHeroProps {
  welcome: WelcomeCopy;
}

export function WelcomeHero({ welcome }: WelcomeHeroProps) {
  return (
    <section className="hero-wash relative flex min-h-[calc(100vh-3.5rem)] flex-col justify-center">
      <div className="animate-fade-up mx-auto w-full max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
          {welcome.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {welcome.headline}
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
          {welcome.subheadline}
        </p>
        <div className="mt-8">
          <Link to="/agents">
            <Button size="lg" className="w-full sm:w-auto">
              {welcome.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
