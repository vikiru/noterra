import { Profanity } from '@2toad/profanity';
import { z } from 'zod';

export const profanity = new Profanity({
    wholeWord: false,
    grawlix: '*****',
    grawlixChar: '$',
    languages: ['en'],
});

export const promptSchema = z.object({
    prompt: z
        .string()
        .min(2, { message: 'Prompt is expected to be at least 2 characters' })
        .max(1000, {
            message: 'Prompt is expected to be at most 1000 characters',
        })
        .refine((prompt) => !profanity.exists(prompt), {
            message: 'Prompt contains inappropriate language',
        }),
});
