import z from 'zod';
import '../../envConfig.ts';
import { validateData } from '@/lib/utils/validateData.js';

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

const env = validateData(process.env, envSchema);

if (!env.success) {
  console.error('Invalid environment variables', env.error);
  throw new Error('Invalid environment variables');
}

export const validatedEnv = env.data;

export const geminiApiKey = validatedEnv.GEMINI_API_KEY;
export const googleBooksApiKey = validatedEnv.GOOGLE_BOOKS_API_KEY;
export const youtubeDataApiKey = validatedEnv.YOUTUBE_DATA_API_KEY;
export const nodeEnv = validatedEnv.NODE_ENV;
export const databaseUrl = validatedEnv.DATABASE_URL;
