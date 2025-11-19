import { Sparkles } from 'lucide-react';
import { GetStartedButton } from './GetStartedButton';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-32 sm:pt-24 sm:pb-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="font-body tracking-wide uppercase text-xs">
                AI-Powered Learning
              </span>
            </div>
          </div>

          <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl font-heading bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 pb-2">
            Transform the way you <br />
            <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              learn
            </span>
          </h1>

          <p className="mx-auto mt-6 -mb-3 leading-relaxed text-muted-foreground font-body max-w-3xl">
            Choose any topic and let AI break it down into simple,
            easy-to-understand insights. Gain clarity, master complex ideas, and
            discover practical ways to apply your new knowledge.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GetStartedButton />
          </div>
        </div>
      </div>
    </section>
  );
}
