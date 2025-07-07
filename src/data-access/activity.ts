import { eq } from 'drizzle-orm';
import { z } from 'zod/v4';

import { db } from '@/db';
import { userActivityTable } from '@/db/schema';
import { activitySchema } from '@/schema/databaseSchema';
import { ResponseData } from '@/types/response';
import { UserActivity, UserActivityCreate } from '@/types/userActivity';

export async function createUserActivity(
    activity: UserActivityCreate,
): Promise<ResponseData<UserActivity>> {
    try {
        const result = activitySchema.insert.safeParse(activity);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid activity data provided. Please try again with valid data.',
            };
        }
        const validatedActivity = result.data;
        const newActivity = await db
            .insert(userActivityTable)
            .values(validatedActivity)
            .returning();
        if (!newActivity) {
            return { success: false, error: 'Failed to create activity.' };
        }
        return { success: true, data: newActivity[0] };
    } catch (error) {
        console.error('Error creating activity:', error);
        return {
            success: false,
            error: 'An unexpected error occured during activity creation. Please try again.',
        };
    }
}

export async function fetchUserActivities(
    userId: string,
): Promise<ResponseData<UserActivity[]>> {
    try {
        const result = z.uuid().safeParse(userId);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user id provided. Please try again with a valid id.',
            };
        }
        const validatedId = result.data;
        const activities = await db
            .select()
            .from(userActivityTable)
            .where(eq(userActivityTable.userId, validatedId));
        if (!activities) {
            return { success: false, error: 'No activities found for user' };
        }
        return { success: true, data: activities };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'An unexpected error occured while fetching user activities. Please try again.',
        };
    }
}
