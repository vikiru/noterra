'use client';

import { useRef } from 'react';
import { NoteActions } from '@/features/notes/components/NoteActions';
import { NoteContent } from '@/features/notes/components/NoteContent';
import { NoteHeader } from '@/features/notes/components/NoteHeader';
import type { Note } from '@/features/notes/types/notes';
import { useNoteExport } from '../hooks/useNoteExport';

interface NoteDetailProps {
  note: Note;
}

export function NoteDetail({ note }: NoteDetailProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const { convertToMarkdown, convertToText, convertToPDF } = useNoteExport({
    note,
    contentRef,
  });

  return (
    <section
      className="container max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
      id="note-ctr"
    >
      <NoteActions
        noteId={note.id}
        onExportMarkdown={convertToMarkdown}
        onExportPDF={convertToPDF}
        onExportText={convertToText}
      />

      <section id="note">
        <NoteHeader note={note} />
        <NoteContent content={note.content} contentRef={contentRef} />
      </section>
    </section>
  );
}
