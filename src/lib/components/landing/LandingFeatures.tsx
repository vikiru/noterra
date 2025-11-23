import { Download, Pencil, WandSparkles } from 'lucide-react';
import { FeatureCard } from '@/lib/components/landing/FeatureCard';

const features = [
  {
    name: 'AI Note Generation',
    description:
      'Effortlessly create comprehensive notes that break down complex topics into digestible chunks, powered by Gemini AI.',
    icon: WandSparkles,
  },
  {
    name: 'Powerful Editor',
    description:
      'Enjoy a seamless writing experience with our rich text editor powered by TipTap. Format, organize, and style your notes with ease.',
    icon: Pencil,
  },
  {
    name: 'Export and Share',
    description:
      'Export your notes to multiple formats including Markdown, PDF, and plain text. Share your knowledge with others effortlessly.',
    icon: Download,
  },
];

export function LandingFeatures() {
  return (
    <section
      className="relative py-24 sm:py-28 bg-linear-to-b from-muted/30 to-background"
      id="features"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-balance mt-2 text-4xl font-bold tracking-tighter text-foreground sm:text-5xl font-heading">
            Powerful Features for Effective Learning
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground font-body text-pretty">
            Transform the way you learn with our AI-powered tools designed to
            enhance your study experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div key={feature.name}>
              <FeatureCard
                description={feature.description}
                icon={feature.icon}
                title={feature.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
