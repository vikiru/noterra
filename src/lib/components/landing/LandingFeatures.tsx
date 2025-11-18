import { Download, Pencil, WandSparkles } from 'lucide-react';

export function LandingFeatures() {
  return (
    <section
      className="container mx-auto pb-16 px-4 sm:px-6 lg:px-8"
      id="features"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
          Powerful Features for Effective Learning
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto font-body">
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
          <h3 className="mb-2 text-lg font-semibold font-heading">AI Note Generation</h3>
          <p className="text-muted-foreground font-body">
            Effortlessly create comprehensive notes that break down complex
            topics into digestible chunks, powered by Gemini AI.
          </p>
        </div>

        {/* Export and Share */}
        <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Download className="h-5 w-5" />
          </div>
          <h3 className="mb-2 text-lg font-semibold font-heading">Export and Share</h3>
          <p className="text-muted-foreground font-body">
            Export your notes to multiple formats including Markdown, PDF, and
            plain text. Share your knowledge with others effortlessly.
          </p>
        </div>

        {/* Powerful Editor */}
        <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Pencil className="h-5 w-5" />
          </div>
          <h3 className="mb-2 text-lg font-semibold font-heading">Powerful Editor</h3>
          <p className="text-muted-foreground font-body">
            Enjoy a seamless writing experience with our rich text editor
            powered by TipTap. Format, organize, and style your notes with
            ease.
          </p>
        </div>
      </div>
    </section>
  );
}
