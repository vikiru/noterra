import DOMPurify from 'isomorphic-dompurify';

import type { GeminiNoteContent } from '@/gemini/types/geminiResponse';

export function combineHTML(notesContents: GeminiNoteContent[]): string {
  let combinedHTML = '';

  notesContents.forEach((noteContent: GeminiNoteContent) => {
    const sanitizedHTML = DOMPurify.sanitize(noteContent.content);
    combinedHTML += sanitizedHTML;
  });

  return combinedHTML;
}
