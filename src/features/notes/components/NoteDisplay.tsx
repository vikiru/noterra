'use client';
import parse from 'html-react-parser';
import { useRef } from 'react';
import type { Note } from '@/features/notes/types/notes';

export function NoteDisplay({ note }: { note: Note }) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main
      aria-label="Note details"
      className="flex flex-col min-h-screen w-full max-w-4xl mx-auto p-4 overflow-y-auto"
      id="note-details"
    >
      <header className="mb-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center sm:text-left text-balance scroll-m-20">
          {note.title}
        </h1>

        <p className="mt-2 text-sm sm:text-base text-center sm:text-left">
          Created on{' '}
          <time dateTime={note.createdAt.toISOString()}>
            {note.createdAt.toISOString()}
          </time>
        </p>
      </header>

      <article
        className="prose max-w-none prose-neutral prose-base sm:prose-lg dark:prose-invert" // Attach ref to the content element
        id="note"
        ref={contentRef}
      >
        {parse(note.content)}
      </article>
    </main>
  );
}
