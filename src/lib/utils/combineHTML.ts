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

// TODO: check user id in db before using action
// TODO: get mermaid diagrams rendered in this before saving to db
// TODO: create sep fn to save note to db
