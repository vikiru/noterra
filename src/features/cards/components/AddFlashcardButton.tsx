'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FlashcardFormDialog } from '@/features/cards/components/FlashcardFormDialog';
import { MAX_FLASHCARDS_PER_NOTE } from '@/features/cards/constants';

type AddFlashcardButtonProps = {
  noteId: string;
  currentCount: number;
};

export function AddFlashcardButton({
  noteId,
  currentCount,
}: AddFlashcardButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isLimitReached = currentCount >= MAX_FLASHCARDS_PER_NOTE;

  return (
    <div className="flex items-center gap-3">
      <Badge
        className="text-sm font-medium"
        variant={isLimitReached ? 'destructive' : 'secondary'}
      >
        {currentCount} / {MAX_FLASHCARDS_PER_NOTE}
      </Badge>

      <Button
        className="w-full sm:w-auto shadow-sm"
        disabled={isLimitReached}
        onClick={() => setIsDialogOpen(true)}
        title={
          isLimitReached
            ? 'Maximum flashcard limit reached'
            : 'Add new flashcard'
        }
      >
        <Plus className="mr-2 size-4" />
        Add New Card
      </Button>

      <FlashcardFormDialog
        noteId={noteId}
        onOpenChange={setIsDialogOpen}
        open={isDialogOpen}
      />
    </div>
  );
}
