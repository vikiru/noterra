'use client';

import { useAuth } from '@clerk/nextjs';
import { Loader2, WandSparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createMultipleFlashcards } from '@/features/cards/actions/flashcard';
import { generateGeminiNote } from '@/features/gemini/actions/generateGeminiNote';
import { promptSchema } from '@/features/gemini/schema/promptSchema';
import { constructCards } from '@/features/gemini/utils/constructCards';
import { constructNote } from '@/features/gemini/utils/constructNote';
import { createNote } from '@/features/notes/actions/notes';
import type { Note } from '@/features/notes/types/notes';
import { validateData } from '@/lib/utils/validateData';

export function PromptForm() {
  const { userId } = useAuth();

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    const result = promptSchema.safeParse({ prompt: e.target.value });
    setValidationError(result.success ? '' : result.error.issues[0].message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateData({ prompt }, promptSchema);
    if (!result.success) {
      setValidationError(result.error);
      return;
    }
    const validatedPrompt = result.data.prompt;

    try {
      setLoading(true);
      const geminiResponseData = await generateGeminiNote(validatedPrompt);

      if (!geminiResponseData.success) {
        toast.error(geminiResponseData.error);
        setLoading(false);
        return;
      }

      const note = constructNote(geminiResponseData.data, userId as string);

      const noteCreationResult = await createNote(note);
      if (!noteCreationResult.success) {
        toast.error(noteCreationResult.error);
        setLoading(false);
        return;
      }

      const newNote = noteCreationResult.data as Note;
      toast.success('Note generated successfully!');

      const flashcards = constructCards(
        geminiResponseData.data.flashcards,
        newNote.authorId,
        newNote.id,
      );
      const flashcardsCreationResult =
        await createMultipleFlashcards(flashcards);

      if (!flashcardsCreationResult.success) {
        toast.error(flashcardsCreationResult.error);
        setLoading(false);
        return;
      }

      toast.success('Flashcards generated successfully!');
      setLoading(false);

      redirect(`${NOTES_ROUTE}/${newNote.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Unexpected error occurred while generating note.');
      setLoading(false);
    }
  };

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

          <Input
            className="h-12 text-base"
            id="prompt"
            maxLength={500}
            name="prompt"
            onChange={handleChange}
            placeholder="Enter a topic to generate note and flashcards..."
            type="text"
            value={prompt}
          />

          {validationError && (
            <p className="text-sm text-red-500">{validationError}</p>
          )}

          <Button
            className="mt-2 w-full py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
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
              <span className="flex items-center gap-2 hover:cursor-pointer">
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
              ].map((example, index) => (
                <button
                  className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm text-foreground/90 transition-all hover:bg-accent/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  key={index}
                  onClick={() => {
                    setPrompt(example);
                    setValidationError('');
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
