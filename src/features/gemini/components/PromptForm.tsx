'use client';

import { Loader2, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePromptForm } from '@/features/gemini/hooks/usePromptForm';

export function PromptForm() {
  const { prompt, loading, validationError, handleChange, handleSubmit } =
    usePromptForm();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              className="block text-sm font-medium leading-6"
              htmlFor="prompt"
            >
              Topic
            </label>
            <span className="text-xs text-muted-foreground">
              {prompt.length}/500 characters
            </span>
          </div>

          <Textarea
            className="h-32"
            disabled={loading}
            id="prompt"
            maxLength={500}
            name="prompt"
            onChange={handleChange}
            placeholder="Enter a topic to generate note and flashcards..."
            rows={4}
            style={{ resize: 'none' }}
            value={prompt}
          />

          {validationError && (
            <p className="text-sm text-red-500">{validationError}</p>
          )}

          <Button
            className="mt-2 w-full py-6 text-base font-semibold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            disabled={loading || validationError !== ''}
            size="lg"
            type="submit"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2 hover:cursor-pointer dark:text-white">
                Generate Note
                <WandSparkles className="h-5 w-5" />
              </span>
            )}
          </Button>

          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-foreground/80">
              Try these examples:
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Explain recursion in simple terms',
                'Explain quantum computing basics',
                'How does blockchain work?',
                'What is machine learning?',
              ].map((example) => (
                <button
                  className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm text-foreground/90 transition-all hover:bg-accent/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 hover:cursor-pointer"
                  key={example}
                  onClick={() => {
                    const syntheticEvent = {
                      target: { value: example },
                    } as React.ChangeEvent<HTMLTextAreaElement>;
                    handleChange(syntheticEvent);
                  }}
                  type="button"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
