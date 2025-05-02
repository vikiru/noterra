export type GeminiNoteContent = {
    title: string;
    heading_level: number;
    content: string;
    includes_diagram: boolean;
    diagram_type: string;
};

export type GeminiMetadata = {
    title: string;
    keywords: string[];
    summary: string;
};

export type GeminiFlashcard = {
    question: string;
    answer: string;
};

export type GeminiResponse = {
    notes_contents: Array<GeminiNoteContent>;
    metadata: GeminiMetadata;
    flashcards: Array<GeminiFlashcard>;
};
