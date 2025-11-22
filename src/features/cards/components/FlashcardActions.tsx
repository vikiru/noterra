import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Flashcard } from '@/features/cards/types/flashcard';

// TODO: Fix this.

export function FlashcardActions({ card }: { card: Flashcard }) {
  const handleEdit = (card: Flashcard) => {
    console.log(card);
  };

  const handleDelete = (card: Flashcard) => {
    console.log(card);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(card)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(card)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
