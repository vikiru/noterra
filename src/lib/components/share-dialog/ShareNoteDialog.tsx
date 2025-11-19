'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShareLink } from './ShareLink';
import { VisibilityCard } from './VisibilityCard';

type ShareNoteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPublic?: boolean;
  isShared?: boolean;
  noteId: string;
  shareToken: string;
  username: string;
};

export function ShareNoteDialog({
  open,
  onOpenChange,
  isPublic: initialIsPublic = false,
  isShared: initialIsShared = false,
  noteId,
  shareToken,
  username,
}: ShareNoteDialogProps) {
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [isShared, setIsShared] = useState(initialIsShared);
  const [showFlashcards, setShowFlashcards] = useState(false);

  const getShareLink = () => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    if (isPublic) {
      return `${baseUrl}/${username}/notes/${noteId}`;
    }
    return `${baseUrl}/shared/${shareToken}`;
  };

  const link = getShareLink();

  const handleSave = () => {
    onOpenChange(false);
    toast.success('Sharing settings saved');
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden border-neutral-200 dark:border-neutral-800">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-black">
            Note Visibility
          </DialogTitle>
          <DialogDescription className="text-neutral-500 dark:text-neutral-400">
            Manage access and visibility settings for this note.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 flex flex-col gap-6">
          <VisibilityCard
            isPublic={isPublic}
            isShared={isShared}
            onPublicChange={setIsPublic}
            onSharedChange={setIsShared}
            onShowFlashcardsChange={setShowFlashcards}
            showFlashcards={showFlashcards}
          />

          {(isPublic || (isShared && !isPublic)) && (
            <ShareLink isPublic={isPublic} link={link} />
          )}
        </div>

        <DialogFooter className="bg-neutral-50 dark:bg-neutral-900/50 px-6 py-4 border-t border-neutral-100 dark:border-neutral-800">
          <Button
            className="h-9 text-black"
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button className="h-9" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
