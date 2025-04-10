import { geminiApiKey } from '@/config';
import { geminiPrompt } from '@/gemini/prompt';
import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(geminiApiKey);

const safetySettings = Object.values(HarmCategory)
    .filter((category) => category !== HarmCategory.HARM_CATEGORY_UNSPECIFIED)
    .map((category) => ({
        category: category,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    }));

const generationConfig = {
    temperature: 0.5,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: 'application/json',
};

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: geminiPrompt,
    safetySettings: safetySettings,
    generationConfig: generationConfig,
});

export { model };

// todo: cleanup prompt, update mermaid diagram handling, build a simple tiptap editor component just to preview this
// add google books and yt data api for 5-10 books/videos relevant to the topic for books `Title (Year Released) - Author(s)`.
// videos: `Video Title (hyperlinked) - (channel name)`
