import { Logo } from '@/lib/components/Logo';

export function LandingFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground font-body">
            &copy; {new Date().getFullYear()} Noterra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
