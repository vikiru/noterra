import type { FlashcardCreate } from '@/features/cards/types/flashcard';
import type { GeminiFlashcard } from '@/features/gemini/types/geminiResponse';

export function constructCards(flashcards: GeminiFlashcard[], authorId: string, noteId: string): FlashcardCreate[] {
  const newFlashcads: FlashcardCreate[] = flashcards.map((flashcard: GeminiFlashcard) => {
    return {
      question: flashcard.question,
      answer: flashcard.answer,
      authorId,
      noteId,
    };
  });
  return newFlashcads;
}
