'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNoteDelete } from '@/features/notes/hooks/useNoteDelete';
import { ShareNoteDialog } from '@/features/share/components/ShareNoteDialog';
import { DeleteDialog } from '@/lib/components/ui/DeleteDialog';
import { NoteEditButton } from '../../editor/components/NoteEditButton';
import { NoteExportMenu } from '../../export/components/NoteExportMenu';
import { NoteShareButton } from '../../share/components/NoteShareButton';

type NoteActionsProps = {
  onExportMarkdown: () => void;
  onExportText: () => void;
  onExportPDF: () => void;
  noteId: string;
  shareToken: string;
  username: string;
  showUserActions?: boolean;
  showFlashcardButton?: boolean;
  isPublic: boolean;
  isShared: boolean;
  showCards: boolean;
};

// TODO: Fix prop drilling
export function NoteActions({
  onExportMarkdown,
  onExportText,
  onExportPDF,
  noteId,
  shareToken,
  username,
  showUserActions = true,
  showFlashcardButton = true,
  isPublic,
  isShared,
  showCards,
}: NoteActionsProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { isDeleteDialogOpen, setIsDeleteDialogOpen, onDelete, loading } =
    useNoteDelete({ noteId });

  return (
    <>
      <section className="flex justify-between items-center mb-6" id="actions">
        {showUserActions ? (
          <Button
            asChild
            className="-ml-3 text-muted-foreground hover:text-black"
            size="sm"
            variant="ghost"
          >
            <Link className="flex items-center gap-2" href="/notes">
              <ArrowLeft className="h-4 w-4" />
              Back to Notes
            </Link>
          </Button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-1.5">
          {showUserActions && <NoteEditButton />}
          {showUserActions && (
            <NoteShareButton onClick={() => setIsShareDialogOpen(true)} />
          )}
          <NoteExportMenu
            isStandalone={!showUserActions}
            onDelete={
              showUserActions ? () => setIsDeleteDialogOpen(true) : undefined
            }
            onExportMarkdown={onExportMarkdown}
            onExportPDF={onExportPDF}
            onExportText={onExportText}
            showFlashcardButton={showFlashcardButton}
          />
        </div>
      </section>

      {showUserActions && (
        <>
          <ShareNoteDialog
            initialPublic={isPublic}
            initialShared={isShared}
            initialShowCards={showCards}
            noteId={noteId}
            onOpenChange={setIsShareDialogOpen}
            open={isShareDialogOpen}
            shareToken={shareToken}
            username={username}
          />
          <DeleteDialog
            description="Are you sure you want to delete this note? This action cannot be undone."
            loading={loading}
            onConfirm={onDelete}
            onOpenChange={setIsDeleteDialogOpen}
            open={isDeleteDialogOpen}
            title="Delete Note"
          />
        </>
      )}
    </>
  );
}
