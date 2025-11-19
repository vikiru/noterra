'use client';

import type { RefObject } from 'react';
import { useMermaidRender } from '../hooks/useMermaidRender';

interface NoteContentProps {
  content: string;
  contentRef: RefObject<HTMLDivElement | null>;
}

export function NoteContent({ content, contentRef }: NoteContentProps) {
  useMermaidRender();

  return (
    <section
      className="max-w-none prose bg-white px-6 pb-2 pt-1 dark:prose-invert px-1 py-2 rounded-lg"
      dangerouslySetInnerHTML={{ __html: content }}
      id="note-content"
      ref={contentRef}
    />
  );
}
