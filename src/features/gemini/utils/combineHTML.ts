import type { GeminiNoteContent } from '@/gemini/types/geminiResponse';

export function combineHTML(notesContents: GeminiNoteContent[]): string {
  let combinedHTML = '';

  notesContents.forEach((noteContent: GeminiNoteContent) => {
    combinedHTML += noteContent.content;
  });

  return combinedHTML;
}
