'use client';

import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NoteEditButton() {
  return (
    <Button
      className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
      size="sm"
      variant="ghost"
    >
      <Edit className="h-4 w-4" />
      <span className="hidden sm:inline">Edit</span>
    </Button>
  );
}
