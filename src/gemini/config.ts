import { geminiPrompt } from '@/gemini/prompt';
import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = Object.values(HarmCategory).map((category) => {
    return {
        category: category,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    };
});

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
