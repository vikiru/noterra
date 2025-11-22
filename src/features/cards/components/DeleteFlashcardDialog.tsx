'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteFlashcard } from '@/features/cards/actions/flashcard';
import type { Flashcard } from '@/features/cards/types/flashcard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/lib/components/ui/alert-dialog';

type DeleteFlashcardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flashcard: Flashcard;
};

export function DeleteFlashcardDialog({
  open,
  onOpenChange,
  flashcard,
}: DeleteFlashcardDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteFlashcard(flashcard.id);

      if (!result.success) {
        toast.error(result.error);
        setLoading(false);
        return;
      }

      toast.success('Flashcard deleted successfully!');
      setLoading(false);
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      toast.error('Unexpected error occurred while deleting flashcard.');
      setLoading(false);
    }
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Flashcard</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this flashcard? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
