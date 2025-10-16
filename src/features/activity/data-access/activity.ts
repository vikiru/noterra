'use server';
import { desc, eq } from 'drizzle-orm';
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

export async function findRecentUserActivities(
  userId: string,
): Promise<UserActivity[]> {
  const result = await db
    .select()
    .from(userActivityTable)
    .where(eq(userActivityTable.userId, userId))
    .orderBy(desc(userActivityTable.createdAt))
    .limit(10);
  return result;
}
