import { Sparkles } from 'lucide-react';
import { GetStartedButton } from '@/lib/components/landing/GetStartedButton';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-32 sm:pt-24 sm:pb-40">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size[14px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px] animate-pulse" />
        <div className="absolute left-1/4 top-1/3 -z-10 h-[200px] w-[200px] rounded-full bg-blue-500/10 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-background/95 text-foreground px-3 py-1 text-sm font-medium backdrop-blur-sm hover:border-primary/40 hover:bg-primary/15 dark:hover:border-primary/40 dark:bg-background/95 dark:text-foreground">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="font-body tracking-wide uppercase text-xs">AI-Powered Learning</span>
            </div>
          </div>

          <h1 className="text-balance text-5xl font-bold tracking-tighter sm:text-7xl font-heading bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 pb-2">
            Transform the way you <br />
            <span className="bg-linear-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
              learn
            </span>
          </h1>

          <p className="text-pretty mx-auto mt-6 -mb-3 leading-relaxed text-muted-foreground font-body max-w-3xl text-lg">
            Choose any topic and let AI break it down into simple, easy-to-understand insights. Gain clarity, master
            complex ideas, and discover practical ways to apply your new knowledge.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GetStartedButton />
          </div>
        </div>
      </div>
    </section>
  );
}
