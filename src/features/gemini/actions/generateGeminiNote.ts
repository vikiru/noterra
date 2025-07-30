'use server';

import { genAI, generationConfig, model } from '@/gemini/config';
import { promptSchema } from '@/gemini/schema/promptSchema';
import type { GeminiResponse } from '@/gemini/types/geminiResponse';
import { getCurrentUser } from '@/lib/auth';

// TODO: convert to use ResponseData type.
export async function generateGeminiNote(prompt: string) {
  await getCurrentUser();
  const validatedPrompt = promptSchema.safeParse({ prompt });
  if (!validatedPrompt.success) {
    throw new Error('Invalid prompt, please try again.');
  }
  const geminiPrompt = validatedPrompt.data.prompt;

  const contents = [
    {
      role: 'user',
      parts: [{ text: geminiPrompt }],
    },
  ];

  const result = await genAI.models.generateContentStream({
    model,
    config: generationConfig,
    contents: contents,
  });

  if (!result) {
    throw new Error('No response from Gemini. Please try again later.');
  }

  let chunkedText = '';
  for await (const chunk of result) {
    chunkedText += chunk.text;
  }

  const response: GeminiResponse = JSON.parse(chunkedText);
  return response;
}
