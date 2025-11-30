'use client';

import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FlashcardFormDialog } from '@/features/cards/components/FlashcardFormDialog';
import { useFlashcardDelete } from '@/features/cards/hooks/useFlashcardDelete';
import type { Flashcard } from '@/features/cards/types/flashcard';
import { DeleteDialog } from '@/lib/components/dialog/DeleteDialog';

export function FlashcardActions({ card }: { card: Flashcard }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { isDeleteDialogOpen, setIsDeleteDialogOpen, onDelete, loading } =
    useFlashcardDelete({ flashcardId: card.id });

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteClick} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FlashcardFormDialog
        initialData={card}
        noteId={card.noteId}
        onOpenChange={setIsEditDialogOpen}
        open={isEditDialogOpen}
      />

      <DeleteDialog
        description="Are you sure you want to delete this flashcard? This action cannot be undone."
        loading={loading}
        onConfirm={onDelete}
        onOpenChange={setIsDeleteDialogOpen}
        open={isDeleteDialogOpen}
        title="Delete Flashcard"
      />
    </>
  );
}
