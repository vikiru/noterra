'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { NoteEditButton } from '@/features/editor/components/NoteEditButton';
import { NoteExportMenu } from '@/features/export/components/NoteExportMenu';
import { NoteContent } from '@/features/notes/components/NoteContent';
import { NoteHeader } from '@/features/notes/components/NoteHeader';
import type { Note } from '@/features/notes/types/notes';
import { ShareNoteDialog } from '@/features/share/components/ShareNoteDialog';
import { Button } from '@/lib/components/ui/button';

type NoteDetailProps = {
  note: Note & {
    author: { username: string; firstName: string; lastName: string };
  };
  showUserActions?: boolean;
  showFlashcardButton?: boolean;
};

export function NoteDetail({
  note,
  showUserActions,
  showFlashcardButton,
}: NoteDetailProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const visibility = {
    isPublic: note.public,
    isShared: note.shared,
    showCards: note.showCards,
  };

  return (
    <section
      className="container max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
      id="note-ctr"
    >
      <section
        className="flex justify-between items-center mb-6 -my-4"
        id="actions"
      >
        {showUserActions ? (
          <>
            <div className="flex items-center gap-2">
              <Button
                asChild
                className="-ml-3 text-muted-foreground hover:text-black w-fit"
                size="sm"
                variant="ghost"
              >
                <Link href={`/notes`}>
                  <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
                  Back to Notes
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-1.5">
              <NoteEditButton />
              <ShareNoteDialog
                noteId={note.id}
                shareToken={note.shareToken}
                username={note.author.username}
                visibility={visibility}
              />
              <NoteExportMenu
                content={note.content}
                contentRef={contentRef}
                noteId={note.id}
                showFlashcardButton={showFlashcardButton}
                showUserActions={showUserActions}
                title={note.title}
              />
            </div>
          </>
        ) : (
          <section className="ml-auto" id="actions">
            <NoteExportMenu
              content={note.content}
              contentRef={contentRef}
              noteId={note.id}
              showFlashcardButton={showFlashcardButton}
              showUserActions={showUserActions}
              title={note.title}
            />
          </section>
        )}
      </section>

      <section id="note">
        <NoteHeader note={note} />
        <NoteContent content={note.content} contentRef={contentRef} />
      </section>
    </section>
  );
}
