'use client';

import mermaid from 'mermaid';
import { useEffect, RefObject } from 'react';

interface NoteContentProps {
  content: string;
  contentRef: RefObject<HTMLDivElement>;
}

export function NoteContent({ content, contentRef }: NoteContentProps) {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
    });

    const renderMermaidDiagrams = async () => {
      const mermaidDivs = document.querySelectorAll(
        'div[id*="diagram"], div#mindmap-overview-mindmap, div[id*="mindmap"], pre.mermaid',
      );
      const mermaidDiagrams: Element[] = [];

      mermaidDivs.forEach((div) => {
        const pre = div.firstElementChild;
        if (pre && pre.tagName === 'PRE') {
          mermaidDiagrams.push(pre);
        }
      });

      if (mermaidDiagrams.length > 0) {
        // @ts-ignore - mermaid types might be slightly off for run
        await mermaid.run({
          nodes: mermaidDiagrams,
          suppressErrors: true,
        });
      }
    };

    renderMermaidDiagrams();
  }, [content]);

  return (
    <section
      className="max-w-none prose prose-slate dark:prose-invert px-1 py-2 rounded-lg"
      dangerouslySetInnerHTML={{ __html: content }}
      id="note-content"
      ref={contentRef}
    />
  );
}
