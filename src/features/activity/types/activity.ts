import type z from 'zod';
import type {
  insertActivitySchema,
  selectActivitySchema,
} from '@/features/activity/schema/activitySchema';

export type UserActivity = z.infer<typeof selectActivitySchema>;
export type UserActivityCreate = z.infer<typeof insertActivitySchema>;
