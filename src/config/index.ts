import { z } from 'zod';

import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
    NODE_ENV: z
        .union([z.literal('development'), z.literal('production')])
        .optional()
        .default('development'),
    DATABASE_URL: z.string().url(),
    GEMINI_API_KEY: z.string(),
    GOOGLE_BOOKS_API_KEY: z.string().optional(),
    YOUTUBE_DATA_API_KEY: z.string().optional(),
});

const env = envSchema.safeParse(process.env);

if (env.success === false) {
    console.error('Invalid environment variables', env.error.format());
    throw new Error('Invalid environment variables');
}

const validatedEnv = env.data;

const geminiApiKey = validatedEnv.GEMINI_API_KEY;
const googleBooksApiKey = validatedEnv.GOOGLE_BOOKS_API_KEY;
const youtubeDataApiKey = validatedEnv.YOUTUBE_DATA_API_KEY;
const nodeEnv = validatedEnv.NODE_ENV;
const databaseUrl = validatedEnv.DATABASE_URL;

export {
    geminiApiKey,
    googleBooksApiKey,
    youtubeDataApiKey,
    nodeEnv,
    databaseUrl,
};
