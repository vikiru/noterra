import { Lightbulb } from 'lucide-react';

export function PromptTips() {
  return (
    <div className="mx-auto mt-12 max-w-2xl">
      <h3 className="mb-4 text-sm font-medium">Tips for best results:</h3>
      <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <li className="flex items-start gap-2">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
          <span>Be specific with your topic for more focused notes</span>
        </li>
        <li className="flex items-start gap-2">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
          <span>Try adding "for beginners" or "advanced" to adjust difficulty</span>
        </li>
      </ul>
    </div>
  );
}
