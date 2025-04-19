import { z } from 'zod';
import { userSchema } from '@/schema';

export type User = Omit<
    z.infer<typeof userSchema.select>,
    'clerkId' | 'password'
>;

export type UserCreate = z.infer<typeof userSchema.insert>;
export type UserUpdate = z.infer<typeof userSchema.update>;
