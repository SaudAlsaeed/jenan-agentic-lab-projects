import { Hero } from '@/components/Hero';
import { TeamSection } from '@/components/TeamSection';

export function App() {
  return (
    <>
      <a className="skip-link" href="#team">
        Skip to team
      </a>
      <Hero />
      <TeamSection />
    </>
  );
}
