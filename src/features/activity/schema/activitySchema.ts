import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { userActivityTable } from '@/lib/db/schema';

export const selectActivitySchema = createSelectSchema(userActivityTable);
export const insertActivitySchema = createInsertSchema(userActivityTable).omit({
  id: true,
  createdAt: true,
});
export const updateActivitySchema = createUpdateSchema(userActivityTable);
