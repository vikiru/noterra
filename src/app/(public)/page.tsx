import type { Metadata } from 'next';
import { LandingFeatures } from '@/lib/components/landing/LandingFeatures';
import { LandingHero } from '@/lib/components/landing/LandingHero';
import { Footer } from '@/lib/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Noterra | Home',
  description:
    'AI-powered learning tool for creating and reviewing notes and flashcards.',
};

export default function Home() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <Footer />
    </>
  );
}
