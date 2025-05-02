'use server';

import { model, genAI, generationConfig } from '@/gemini/config';
import { promptSchema } from '@/schema/promptSchema';
import { GeminiResponse } from '@/types/geminiResponse';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function generateGeminiNote(prompt: string) {
    const { userId } = await auth();
    if (!userId) {
        redirect('/auth/login');
    }

    const validatedPrompt = promptSchema.safeParse({ prompt });
    if (!validatedPrompt.success) {
        throw new Error(validatedPrompt.error.errors[0]?.message);
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
