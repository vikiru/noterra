'use client';

import { useState } from 'react';
import { deleteFlashcard } from '@/features/cards/actions/flashcard';
import { useDelete } from '@/lib/hooks/useDelete';

type UseFlashcardDeleteProps = {
  flashcardId: string;
  onSuccess?: () => void;
};

export function useFlashcardDelete({
  flashcardId,
  onSuccess,
}: UseFlashcardDeleteProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { handleDelete, loading } = useDelete({
    deleteAction: deleteFlashcard,
    successMessage: 'Flashcard deleted successfully!',
    errorMessage: 'Unexpected error occurred while deleting flashcard.',
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const onDelete = () => {
    handleDelete(flashcardId);
  };

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    onDelete,
    loading,
  };
}
