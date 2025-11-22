'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteNote } from '@/features/notes/actions/notes';
import { useDelete } from '@/lib/hooks/useDelete';

type UseNoteDeleteProps = {
  noteId: string;
};

export function useNoteDelete({ noteId }: UseNoteDeleteProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { handleDelete, loading } = useDelete({
    deleteAction: deleteNote,
    successMessage: 'Note deleted successfully!',
    errorMessage: 'Unexpected error occurred while deleting note.',
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      router.push('/notes');
    },
  });

  const onDelete = () => {
    handleDelete(noteId);
  };

  return {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    onDelete,
    loading,
  };
}
