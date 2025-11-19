'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NoteShareButtonProps = {
  onClick: () => void;
};

export function NoteShareButton({ onClick }: NoteShareButtonProps) {
  return (
    <Button
      className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
      onClick={onClick}
      size="sm"
      variant="ghost"
    >
      <Share2 className="h-4 w-4" />
      <span className="hidden sm:inline">Share</span>
    </Button>
  );
}
