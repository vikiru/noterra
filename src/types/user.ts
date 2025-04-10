import { z } from 'zod';
import { userSchema } from '@/schema';

export type User = Omit<
    z.infer<typeof userSchema.select>,
    'clerkId' | 'password'
>;
