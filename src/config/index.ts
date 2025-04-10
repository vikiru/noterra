import 'module-alias/register';

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
});

const env = envSchema.parse(process.env);
const geminiApiKey = env.GEMINI_API_KEY;
const googleBooksApiKey = env.GOOGLE_BOOKS_API_KEY;
const youtubeDataApiKey = env.YOUTUBE_DATA_API_KEY;
const nodeEnv = env.NODE_ENV;

export { geminiApiKey, googleBooksApiKey, youtubeDataApiKey, nodeEnv };
