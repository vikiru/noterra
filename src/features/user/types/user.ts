import type z from 'zod';
import type {
  insertUserSchema,
  selectUserSchema,
  updateUserSchema,
} from '@/features/user/schema/userSchema';

export type User = z.infer<typeof selectUserSchema>;
export type UserCreate = z.infer<typeof insertUserSchema>;
export type UserUpdate = z.infer<typeof updateUserSchema>;
