'use client';

import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { VisibilityCard } from '@/features/share/components/VisibilityCard';

type EditorVisibilityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
  isShared: boolean;
  setIsShared: (isShared: boolean) => void;
  showCards: boolean;
  setShowCards: (showCards: boolean) => void;
};

export function EditorVisibilityDialog({
  open,
  onOpenChange,
  isPublic,
  setIsPublic,
  isShared,
  setIsShared,
  showCards,
  setShowCards,
}: EditorVisibilityDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Visibility
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Visibility</DialogTitle>
          <DialogDescription>
            Manage access and visibility settings.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <VisibilityCard
            isPublic={isPublic}
            isShared={isShared}
            onPublicChange={setIsPublic}
            onSharedChange={setIsShared}
            onShowFlashcardsChange={setShowCards}
            showFlashcards={showCards}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
