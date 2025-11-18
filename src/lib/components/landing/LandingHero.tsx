import { GetStartedButton } from './GetStartedButton';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-heading">
            Transform the way you learn
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground font-body">
            Choose any topic and let AI break it down into simple,
            easy-to-understand insights. Gain clarity, master complex ideas,
            and discover practical ways to apply your new knowledge.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center">
            <GetStartedButton />
          </div>
        </div>
      </div>
    </section>
  );
}
