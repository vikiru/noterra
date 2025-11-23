'use client';

import parse from 'html-react-parser';
import type { RefObject } from 'react';
import { useMermaidRender } from '@/features/notes/hooks/useMermaidRender';

type NoteContentProps = {
  content: string;
  contentRef: RefObject<HTMLDivElement | null>;
};

export function NoteContent({ content, contentRef }: NoteContentProps) {
  useMermaidRender();

  return (
    <section
      className="max-w-none prose prose-note bg-background px-6 pb-2 pt-1 dark:prose-invert rounded-lg print:text-black print:dark:prose"
      id="note-content"
      ref={contentRef}
    >
      {parse(content)}
    </section>
  );
}
