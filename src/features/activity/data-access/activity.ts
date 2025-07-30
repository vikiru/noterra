'use server';
import { eq } from 'drizzle-orm';
import type {
  UserActivity,
  UserActivityCreate,
} from '@/activity/types/activity';
import { db } from '@/db/index';
import { userActivityTable } from '@/db/schema';

export async function insertUserActivity(
  activity: UserActivityCreate,
): Promise<UserActivity> {
  const result = await db
    .insert(userActivityTable)
    .values(activity)
    .returning();

  const newActivity = result[0];
  return newActivity;
}

export async function findUserActivities(
  userId: string,
): Promise<UserActivity[]> {
  const result = await db
    .select()
    .from(userActivityTable)
    .where(eq(userActivityTable.userId, userId));
  return result;
}
