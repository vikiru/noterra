import type { GeminiResponse } from '@/features/gemini/types/geminiResponse';
import { combineHTML } from '@/features/gemini/utils/combineHTML';
import type { NoteCreate } from '@/features/notes/types/notes';

export function constructNote(
  geminiResponse: GeminiResponse,
  authorId: string,
) {
  const noteContent = combineHTML(geminiResponse.notes_contents);
  const noteMetaData = geminiResponse.metadata;
  const newNote: NoteCreate = {
    authorId,
    title: noteMetaData.title,
    keywords: noteMetaData.keywords,
    summary: noteMetaData.summary,
    content: noteContent,
    public: false,
    shared: false,
    showCards: false,
  };
  return newNote;
}
