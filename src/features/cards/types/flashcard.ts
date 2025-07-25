export type Flashcard = {
    id: string;
    noteId: string;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
};

export type FlashcardCreate = Omit<Flashcard, 'createdAt' | 'id' | 'updatedAt'>;
export type FlashcardUpdate = Partial<Pick<Flashcard, 'answer' | 'question'>> &
    Pick<Flashcard, 'id' | 'noteId'>;
