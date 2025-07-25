import type { ActivityAction, ActivityType } from '@/db/schema';

export type UserActivity = {
    id: string;
    userId: string;
    action: ActivityAction;
    type: ActivityType;
    entityId: string;
    createdAt: Date;
};

export type UserActivityCreate = Omit<UserActivity, 'createdAt' | 'id'>;
