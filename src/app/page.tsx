'use client';

import { Download, Pencil, WandSparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/components/ui/button';

// TODO: Clean this up -> sep components, cleanup styling and add proper light/dark mode.

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Transform the way you learn
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Choose any topic and let AI break it down into simple,
              easy-to-understand insights. Gain clarity, master complex ideas,
              and discover practical ways to apply your new knowledge.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center">
              <Button
                className="px-8 py-6 text-base font-semibold hover:cursor-pointer"
                onClick={() => router.push('/dashboard')}
                size="lg"
              >
                Get Started
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container mx-auto pb-16 px-4 sm:px-6 lg:px-8"
        id="features"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features for Effective Learning
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform the way you learn with our AI-powered tools designed to
            enhance your study experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* AI Note Generation */}
          <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <WandSparkles className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">AI Note Generation</h3>
            <p className="text-muted-foreground">
              Effortlessly create comprehensive notes that break down complex
              topics into digestible chunks, powered by Gemini AI.
            </p>
          </div>

          {/* Export and Share */}
          <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Download className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Export and Share</h3>
            <p className="text-muted-foreground">
              Export your notes to multiple formats including Markdown, PDF, and
              plain text. Share your knowledge with others effortlessly.
            </p>
          </div>

          {/* Powerful Editor */}
          <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Pencil className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Powerful Editor</h3>
            <p className="text-muted-foreground">
              Enjoy a seamless writing experience with our rich text editor
              powered by TipTap. Format, organize, and style your notes with
              ease.
            </p>
          </div>
        </div>
      </section>
      <footer>
        <div className="border-t border-border py-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Learning Tool. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

// TODO: properly do homepage, dashboard, onboarding and rest of page mockups (all notes/cards, card/notes details, user profile, etc)
