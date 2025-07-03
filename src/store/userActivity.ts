import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { UserActivity } from '@/types/userActivity';

type UserActivityState = {
    userActivity: Map<string, UserActivity>;
    addUserActivity: (userActivity: UserActivity) => void;
    removeUserActivity: (userActivityId: string) => void;
    setUserActivity: (userActivity: Map<string, UserActivity>) => void;
    resetUserActivity: () => void;
};

export const useUserActivityStore = create<UserActivityState>()(
    persist(
        immer((set) => ({
            userActivity: new Map(),
            addUserActivity: (userActivity: UserActivity) => {
                set((state) => {
                    state.userActivity.set(userActivity.id, userActivity);
                });
            },
            removeUserActivity: (userActivityId: string) => {
                set((state) => {
                    state.userActivity.delete(userActivityId);
                });
            },
            setUserActivity: (userActivity: Map<string, UserActivity>) => {
                set((state) => {
                    state.userActivity = userActivity;
                });
            },
            resetUserActivity: () => {
                set((state) => {
                    state.userActivity = new Map();
                });
            },
        })),
        {
            name: 'user-activity-storage',
        },
    ),
);
