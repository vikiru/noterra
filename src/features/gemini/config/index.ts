import { GoogleGenAI, HarmBlockThreshold, HarmCategory, Type } from '@google/genai';

import { geminiApiKey } from '@/config';
import { geminiPrompt } from '@/gemini/prompts/';

const genAI = new GoogleGenAI({ apiKey: geminiApiKey });
const geminiModel = 'gemini-2.5-flash';

const targetedCategories = [
  HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  HarmCategory.HARM_CATEGORY_HARASSMENT,
  HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
];

const safetySettings = targetedCategories.map((category: HarmCategory) => ({
  category,
  threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
}));

const generationConfig = {
  temperature: 0.5,
  safetySettings: safetySettings,
  topP: 0.95,
  topK: 40,
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
          required: ['title', 'heading_level', 'content', 'diagram_type'],
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

export { genAI, generationConfig, geminiModel as model };
