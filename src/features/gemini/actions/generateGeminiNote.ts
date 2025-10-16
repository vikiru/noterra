'use server';

import { genAI, generationConfig, model } from '@/gemini/config';
import { promptSchema } from '@/gemini/schema/promptSchema';
import type { GeminiResponse } from '@/gemini/types/geminiResponse';
import { getCurrentUser } from '@/lib/auth';
import type { ResponseData } from '@/lib/types/response';
import { validateData } from '@/lib/utils/validateData';

// TODO: page.tsx:96 ApiError: got status: UNAVAILABLE. {"error":{"code":503,"message":"The model is overloaded. Please try again later.","status":"UNAVAILABLE"}}
export async function generateGeminiNote(
  prompt: string,
): Promise<ResponseData<GeminiResponse>> {
  await getCurrentUser();

  const promptResult = validateData({ prompt }, promptSchema);
  if (!promptResult.success) {
    return promptResult;
  }

  const geminiPrompt = promptResult.data.prompt;
  const contents = [
    {
      role: 'user',
      parts: [{ text: geminiPrompt }],
    },
  ];

  const geminiResult = await genAI.models.generateContent({
    model,
    config: generationConfig,
    contents: contents,
  });

  if (!geminiResult) {
    return {
      success: false,
      error: 'Failed to generate gemini note. No response from Gemini',
    };
  }

  // let chunkedText = '';
  // for await (const chunk of geminiResult) {
  //   chunkedText += chunk.text;
  // }

  console.log(geminiResult.text);
  const response: GeminiResponse = JSON.parse(geminiResult.text as string);
  return { success: true, data: response };
}
