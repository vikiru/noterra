'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ShareNoteDialog } from '@/components/share-dialog/ShareNoteDialog';
import { Button } from '@/components/ui/button';
import { NoteEditButton } from './NoteEditButton';
import { NoteExportMenu } from './NoteExportMenu';
import { NoteShareButton } from './NoteShareButton';

type NoteActionsProps = {
  onExportMarkdown: () => void;
  onExportText: () => void;
  onExportPDF: () => void;
  onDelete: () => void;
  noteId: string;
  shareToken: string;
  username: string;
  showUserActions?: boolean;
};

export function NoteActions({
  onExportMarkdown,
  onExportText,
  onExportPDF,
  onDelete,
  noteId,
  shareToken,
  username,
  showUserActions = true,
}: NoteActionsProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

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
          <div /> /* Spacer to keep alignment if needed, or just null */
        )}

        <div className="flex items-center gap-1.5">
          {showUserActions && <NoteEditButton />}
          {showUserActions && (
            <NoteShareButton onClick={() => setIsShareDialogOpen(true)} />
          )}
          <NoteExportMenu
            onDelete={showUserActions ? onDelete : undefined}
            onExportMarkdown={onExportMarkdown}
            onExportPDF={onExportPDF}
            onExportText={onExportText}
          />
        </div>
      </section>

      {showUserActions && (
        <ShareNoteDialog
          noteId={noteId}
          onOpenChange={setIsShareDialogOpen}
          open={isShareDialogOpen}
          shareToken={shareToken}
          username={username}
        />
      )}
    </>
  );
}
