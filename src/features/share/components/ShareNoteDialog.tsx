'use client';

import { Loader2, Share2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEditVisibility } from '@/features/editor/hooks/useEditVisibility';
import { ShareLink } from '@/features/share/components/ShareLink';
import { VisibilityCard } from '@/features/share/components/VisibilityCard';
import { useShareNote } from '@/features/share/hooks/useShareNote';

type ShareNoteDialogProps = {
  noteId: string;
  shareToken: string;
  username: string;
  visibility: {
    isPublic: boolean;
    isShared: boolean;
    showCards: boolean;
  };
};

export function ShareNoteDialog({ noteId, shareToken, username, visibility }: ShareNoteDialogProps) {
  const { isPublic, setIsPublic, isShared, setIsShared, showCards, setShowCards } = useEditVisibility({ visibility });

  const visibilityState = {
    isPublic,
    isShared,
    showCards,
  };

  const setVisibilityState = (newState: typeof visibilityState) => {
    setIsPublic(newState.isPublic);
    setIsShared(newState.isShared);
    setShowCards(newState.showCards);
  };

  const { isPending, handleSave } = useShareNote({
    noteId,
    shareToken,
    username,
    isPublic,
    isShared,
    showCards,
  });

  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="gap-1.5" size="sm" variant="ghost">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden border-neutral-200 dark:border-neutral-800">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold">Share Note</DialogTitle>
          <DialogDescription className="text-neutral-500 dark:text-neutral-400">
            Manage access and visibility settings for this note.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-2 space-y-6">
          <VisibilityCard setState={setVisibilityState} state={visibilityState} />

          {(isPublic || isShared) && (
            <ShareLink
              isPublic={isPublic}
              link={
                isPublic
                  ? `${typeof window !== 'undefined' ? window.location.origin : ''}/${username}/notes/${noteId}`
                  : `${typeof window !== 'undefined' ? window.location.origin : ''}/shared/${shareToken}`
              }
            />
          )}
        </div>

        <DialogFooter className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 gap-2">
          <DialogClose asChild>
            <Button className="h-9" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="h-9"
            disabled={isPending}
            onClick={async () => {
              await handleSave();
              setOpen(false);
            }}
          >
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
