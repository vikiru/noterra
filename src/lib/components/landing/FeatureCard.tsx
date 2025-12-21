import type { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-3 text-xl font-bold font-heading tracking-tight">{title}</h3>
      <p className="text-muted-foreground font-body leading-relaxed">{description}</p>
    </div>
  );
}
