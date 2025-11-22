'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  createFlashcard,
  updateFlashcard,
} from '@/features/cards/actions/flashcard';
import { insertFlashcardSchema } from '@/features/cards/schema/flashcardSchema';
import type {
  Flashcard,
  FlashcardCreate,
} from '@/features/cards/types/flashcard';
import { validateData } from '@/lib/utils/validateData';

type UseFlashcardFormProps = {
  noteId: string;
  initialData?: Flashcard;
  onSuccess?: () => void;
};

export function useFlashcardForm({
  noteId,
  initialData,
  onSuccess,
}: UseFlashcardFormProps) {
  const { userId } = useAuth();
  const router = useRouter();
  const [question, setQuestion] = useState(initialData?.question || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const isEditMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
    setValidationError('');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error('You must be logged in to perform this action.');
      return;
    }

    const cardData: FlashcardCreate = {
      authorId: userId,
      noteId,
      question: question.trim(),
      answer: answer.trim(),
    };

    const result = validateData<FlashcardCreate>(
      cardData,
      insertFlashcardSchema,
    );
    if (!result.success) {
      setValidationError(result.error);
      return;
    }

    setValidationError('');

    try {
      setLoading(true);

      if (isEditMode) {
        const updatedCard: Flashcard = {
          ...initialData,
          question: question.trim(),
          answer: answer.trim(),
        };
        const updateResult = await updateFlashcard(updatedCard);

        if (!updateResult.success) {
          toast.error(updateResult.error);
          setLoading(false);
          return;
        }

        toast.success('Flashcard updated successfully!');
      } else {
        const createResult = await createFlashcard(result.data);

        if (!createResult.success) {
          toast.error(createResult.error);
          setLoading(false);
          return;
        }

        toast.success('Flashcard created successfully!');
      }

      setLoading(false);
      setQuestion('');
      setAnswer('');

      if (onSuccess) {
        onSuccess();
      }

      router.refresh();
    } catch (error) {
      console.error('Error saving flashcard:', error);
      toast.error('Unexpected error occurred while saving flashcard.');
      setLoading(false);
    }
  };

  return {
    question,
    setQuestion,
    answer,
    setAnswer,
    loading,
    validationError,
    handleSubmit,
    isEditMode,
  };
}
