import { LandingFeatures } from '@/lib/components/landing/LandingFeatures';
import { LandingFooter } from '@/lib/components/landing/LandingFooter';
import { LandingHero } from '@/lib/components/landing/LandingHero';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <LandingHero />
      <LandingFeatures />
      <LandingFooter />
    </main>
  );
}
