'use client';

import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEditVisibility } from '@/features/editor/hooks/useEditVisibility';
import { ShareLink } from '@/features/share/components/ShareLink';
import { VisibilityCard } from '@/features/share/components/VisibilityCard';
import { useShareNote } from '@/features/share/hooks/useShareNote';

type ShareNoteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noteId: string;
  shareToken: string;
  username: string;
  initialPublic?: boolean;
  initialShared?: boolean;
  initialShowCards?: boolean;
};

export function ShareNoteDialog({
  open,
  onOpenChange,
  noteId,
  shareToken,
  username,
  initialPublic = false,
  initialShared = false,
  initialShowCards = true,
}: ShareNoteDialogProps) {
  const {
    isPublic,
    setIsPublic,
    isShared,
    setIsShared,
    showCards,
    setShowCards,
  } = useEditVisibility({
    initialPublic,
    initialShared,
    initialShowCards,
  });

  const { isPending, link, handleSave } = useShareNote({
    noteId,
    shareToken,
    username,
    isPublic,
    isShared,
    showCards,
    onSuccess: () => onOpenChange(false),
  });

  useEffect(() => {
    if (open) {
      setIsPublic(initialPublic);
      setIsShared(initialShared);
      setShowCards(initialShowCards);
    }
  }, [
    open,
    initialPublic,
    initialShared,
    initialShowCards,
    setIsPublic,
    setIsShared,
    setShowCards,
  ]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden border-neutral-200 dark:border-neutral-800">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold">
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
            onShowFlashcardsChange={setShowCards}
            showFlashcards={showCards}
          />

          {(isPublic || (isShared && !isPublic)) && (
            <ShareLink isPublic={isPublic} link={link} />
          )}
        </div>

        <DialogFooter className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 gap-2">
          <Button
            className="h-9"
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
