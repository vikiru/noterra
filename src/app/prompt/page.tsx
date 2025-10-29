'use client';

import { useAuth } from '@clerk/nextjs';
import { WandSparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { createMultipleFlashcards } from '@/features/cards/actions/flashcard';
import { generateGeminiNote } from '@/features/gemini/actions/generateGeminiNote';
import { constructCards } from '@/features/gemini/utils/constructCards';
import { constructNote } from '@/features/gemini/utils/constructNote';
import { createNote } from '@/features/notes/actions/notes';
import type { Note } from '@/features/notes/types/notes';
import { promptSchema } from '@/gemini/schema/promptSchema';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { validateData } from '@/lib/utils/validateData';

export default function PromptPage() {
  const { userId } = useAuth();

  const [prompt, setPrompt] = useState('');
  const [log, setLog] = useState('');
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
      setLog('Generating note with Gemini....');
      setLoading(true);
      const geminiResponseData = await generateGeminiNote(validatedPrompt);

      if (!geminiResponseData.success) {
        toast.error(geminiResponseData.error);
        setLog('');
        setLoading(false);
        return;
      }

      setLog('Successfully generated note with Gemini.');
      setLog('Combining note contents into singular note...');
      const note = constructNote(geminiResponseData.data, userId as string);

      setLog('Inserting note into DB...');
      const noteCreationResult = await createNote(note);
      if (!noteCreationResult.success) {
        toast.error(noteCreationResult.error);
        setLog('');
        setLoading(false);
        return;
      }

      const newNote = noteCreationResult.data as Note;
      toast.success('Note generated successfully!');

      setLog('Constructing flashcard data for DB insertion...');
      const flashcards = constructCards(
        geminiResponseData.data.flashcards,
        newNote.authorId,
        newNote.id,
      );
      const flashcardsCreationResult =
        await createMultipleFlashcards(flashcards);

      if (!flashcardsCreationResult.success) {
        toast.error(flashcardsCreationResult.error);
        setLog('');
        setLoading(false);
        return;
      }

      toast.success('Flashcards generated successfully!');
      setLog('Successfully inserted flashcards into DB.');
      setLoading(false);

      // Redirect or useStore usage here
      // redirect(`${NOTES_ROUTE}/${newNote.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Unexpected error occurred while generating note.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Generate a New Note</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          aria-invalid={!!validationError}
          className="w-full"
          onChange={handleChange}
          placeholder="Enter a topic..."
          type="text"
          value={prompt}
        />
        {validationError && (
          <p className="text-sm text-red-500">{validationError}</p>
        )}

        <Button
          aria-disabled={loading || validationError !== ''}
          className="w-full flex items-center justify-center gap-2"
          disabled={loading || validationError !== ''}
          type="submit"
        >
          {loading ? (
            'Generating...'
          ) : (
            <>
              Generate Note <WandSparkles size={16} />
            </>
          )}
        </Button>
      </form>

      {log && (
        <div className="text-sm text-muted-foreground whitespace-pre-wrap border border-border rounded p-3">
          {log}
        </div>
      )}
    </div>
  );
}
