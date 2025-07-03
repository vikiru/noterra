import dotenv from 'dotenv';
import path from 'path';
import * as z from 'zod/v4';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
    NODE_ENV: z
        .union([z.literal('development'), z.literal('production')])
        .optional()
        .default('development'),
    DATABASE_URL: z.url(),
    GEMINI_API_KEY: z.string(),
    GOOGLE_BOOKS_API_KEY: z.string().optional(),
    YOUTUBE_DATA_API_KEY: z.string().optional(),
});

const env = envSchema.safeParse(process.env);

if (env.success === false) {
    console.error('Invalid environment variables', z.treeifyError(env.error));
    throw new Error('Invalid environment variables');
}

export const validatedEnv = env.data;

export const geminiApiKey = validatedEnv.GEMINI_API_KEY;
export const googleBooksApiKey = validatedEnv.GOOGLE_BOOKS_API_KEY;
export const youtubeDataApiKey = validatedEnv.YOUTUBE_DATA_API_KEY;
export const nodeEnv = validatedEnv.NODE_ENV;
export const databaseUrl = validatedEnv.DATABASE_URL;
