'use client';

import { Trash2 } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type NoteDeleteButtonProps = {
  onClick: () => void;
};

export function NoteDeleteButton({ onClick }: NoteDeleteButtonProps) {
  return (
    <DropdownMenuItem
      className="cursor-pointer text-destructive focus:text-destructive"
      onClick={onClick}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      <span>Delete Note</span>
    </DropdownMenuItem>
  );
}
