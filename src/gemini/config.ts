import { geminiApiKey } from '@/config';
import { geminiPrompt } from '@/gemini/prompt';
import {
    GoogleGenAI,
    HarmBlockThreshold,
    HarmCategory,
    Type,
} from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: geminiApiKey });
const model = 'gemini-2.0-flash';

const safetySettings = Object.values(HarmCategory)
    .filter((category) => category !== HarmCategory.HARM_CATEGORY_UNSPECIFIED)
    .map((category) => ({
        category: category,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    }));

const generationConfig = {
    temperature: 0.5,
    safetySettings: safetySettings,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: 'application/json',
    responseSchema: {
        type: Type.OBJECT,
        required: ['notes_contents', 'metadata', 'flashcards'],
        properties: {
            notes_contents: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    required: [
                        'title',
                        'heading_level',
                        'content',
                        'diagram_type',
                    ],
                    properties: {
                        title: {
                            type: Type.STRING,
                        },
                        heading_level: {
                            type: Type.NUMBER,
                        },
                        content: {
                            type: Type.STRING,
                        },
                        diagram_type: {
                            type: Type.STRING,
                        },
                    },
                },
            },
            metadata: {
                type: Type.OBJECT,
                required: ['title', 'keywords'],
                properties: {
                    title: {
                        type: Type.STRING,
                    },
                    summary: {
                        type: Type.STRING,
                    },
                    keywords: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING,
                        },
                    },
                },
            },
            flashcards: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    required: ['question', 'answer'],
                    properties: {
                        question: {
                            type: Type.STRING,
                        },
                        answer: {
                            type: Type.STRING,
                        },
                    },
                },
            },
        },
    },
    systemInstruction: [
        {
            text: geminiPrompt,
        },
    ],
};

export { genAI, model, generationConfig };

// todo: cleanup prompt, update mermaid diagram handling, build a simple tiptap editor component just to preview this
// add google books and yt data api for 5-10 books/videos relevant to the topic for books `Title (Year Released) - Author(s)`.
// videos: `Video Title (hyperlinked) - (channel name)`
