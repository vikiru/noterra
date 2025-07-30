'use server';

import type { UserActivityCreate } from '@/activity/types/activity';
import { insertUserActivity } from '@/features/activity/data-access/activity';
import { insertActivitySchema } from '@/features/activity/schema/activitySchema';
import { checkOwnership } from '@/lib/auth';
import { validateData } from '@/lib/utils/validateData';

export async function createUserActivity(activity: UserActivityCreate) {
  try {
    const ownership = await checkOwnership(activity.userId);
    if (!ownership) {
      return {
        success: false,
        error: "You don't have permission to create this activity.",
      };
    }
    const result = validateData<UserActivityCreate>(
      activity,
      insertActivitySchema,
    );
    if (!result.success) {
      return result;
    }
    const validatedActivity = result.data;
    const newActivity = await insertUserActivity(validatedActivity);
    if (!newActivity) {
      return {
        success: false,
        error: 'Failed to create activity. Please try again.',
      };
    }
    return { success: true, data: newActivity };
  } catch (error) {
    console.error('Error creating activity:', error);
    return {
      success: false,
      error:
        'An unexpected error occured during activity creation. Please try again.',
    };
  }
}
