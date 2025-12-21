import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { usersTable } from '@/lib/db/schema';

export const selectUserSchema = createSelectSchema(usersTable);
export const insertUserSchema = createInsertSchema(usersTable)
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .required({
    bio: true,
    country: true,
  });

export const updateUserSchema = createUpdateSchema(usersTable);
