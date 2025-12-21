import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { createMultipleFlashcards } from '@/features/cards/actions/flashcard';
import { generateGeminiNote } from '@/features/gemini/actions/generateGeminiNote';
import { promptSchema } from '@/features/gemini/schema/promptSchema';
import { constructCards } from '@/features/gemini/utils/constructCards';
import { constructNote } from '@/features/gemini/utils/constructNote';
import { createNote } from '@/features/notes/actions/notes';
import type { Note } from '@/features/notes/types/notes';
import { NOTES_ROUTE } from '@/lib/constants/route';
import { validateData } from '@/lib/utils/validateData';

export function usePromptForm() {
  const { userId } = useAuth();
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setPrompt('');
      setValidationError('');
      return;
    }
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
      const flashcards = constructCards(geminiResponseData.data.flashcards, newNote.authorId, newNote.id);
      const flashcardsCreationResult = await createMultipleFlashcards(flashcards);
      if (!flashcardsCreationResult.success) {
        toast.error(flashcardsCreationResult.error);
        setLoading(false);
        return;
      }
      toast.success('Note and flashcards generated successfully!');
      setLoading(false);
      router.push(`${NOTES_ROUTE}/${newNote.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Unexpected error occurred while generating note.');
      setLoading(false);
    }
  };

  return { prompt, loading, validationError, handleChange, handleSubmit };
}
