'use client';

import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteFlashcard } from '@/features/cards/actions/flashcard';
import type { Flashcard } from '@/features/cards/types/flashcard';

type FlashcardActionsProps = {
  card: Flashcard;
};

export function FlashcardActions({ card }: FlashcardActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    // const result = await deleteFlashcard(card.id);
    // if (result.success) {
    //   toast.success('Flashcard deleted');
    //   router.refresh();
    // } else {
    //   toast.error(result.error || 'Failed to delete flashcard');
    // }
    toast.info('Delete action disabled for now');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8" size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            // router.push(`/notes/${card.noteId}/flashcards/${card.id}/edit`)
            toast.info('Edit action disabled for now');
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
