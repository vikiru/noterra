import { z } from 'zod';
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
    GEMINI_API_KEY: z.string(),
    GOOGLE_BOOKS_API_KEY: z.string().optional(),
    YOUTUBE_DATA_API_KEY: z.string().optional(),
    NODE_ENV: z
        .union([z.literal('development'), z.literal('production')])
        .optional()
        .default('development'),
    DATABASE_URL: z.string().url(),
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
