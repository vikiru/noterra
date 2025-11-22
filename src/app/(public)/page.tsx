import type { Metadata } from 'next';
import { LandingFeatures } from '@/lib/components/landing/LandingFeatures';
import { LandingHero } from '@/lib/components/landing/LandingHero';

export const metadata: Metadata = {
  title: 'Noterra | Home',
  description:
    'AI-powered learning tool for creating and reviewing notes and flashcards.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <LandingHero />
      <LandingFeatures />
    </main>
  );
}
