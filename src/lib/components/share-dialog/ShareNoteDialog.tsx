'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
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
import { updateNoteVisibilityAction } from '@/features/notes/actions/notes';
import { ShareLink } from './ShareLink';
import { VisibilityCard } from './VisibilityCard';

type ShareNoteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noteId: string;
  shareToken: string;
  username: string;
  initialIsPublic?: boolean;
  initialIsShared?: boolean;
  initialShowCards?: boolean;
};

export function ShareNoteDialog({
  open,
  onOpenChange,
  noteId,
  shareToken,
  username,
  initialIsPublic = false,
  initialIsShared = false,
  initialShowCards = true,
}: ShareNoteDialogProps) {
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [isShared, setIsShared] = useState(initialIsShared);
  const [showFlashcards, setShowFlashcards] = useState(initialShowCards);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      setIsPublic(initialIsPublic);
      setIsShared(initialIsShared);
      setShowFlashcards(initialShowCards);
    }
  }, [open, initialIsPublic, initialIsShared, initialShowCards]);

  const getShareLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    if (isPublic) {
      return `${baseUrl}/${username}/notes/${noteId}`;
    }
    if (isShared) {
      return `${baseUrl}/shared/${shareToken}`;
    }
    return '';
  };

  const link = getShareLink();

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateNoteVisibilityAction(noteId, {
        public: isPublic,
        shared: isShared,
        showCards: showFlashcards,
      });

      if (result.success) {
        toast.success('Note visibility updated');
        onOpenChange(false);
      } else {
        toast.error(result.error || 'Failed to update visibility');
      }
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden border-neutral-200 dark:border-neutral-800">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-black">
            Share Note
          </DialogTitle>
          <DialogDescription className="text-neutral-500 dark:text-neutral-400">
            Manage access and visibility settings for this note.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-2 space-y-6">
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

        <DialogFooter className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 gap-2">
          <Button
            className="h-9 text-black"
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button className="h-9" disabled={isPending} onClick={handleSave}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
