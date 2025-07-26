import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { UserActivity } from '@/activity/types/activity';

type UserActivityState = {
  userActivities: Map<string, UserActivity>;
  addUserActivity: (userActivity: UserActivity) => void;
  removeUserActivity: (userActivityId: string) => void;
  setUserActivities: (userActivity: Map<string, UserActivity>) => void;
  resetUserActivities: () => void;
};

export const useUserActivityStore = create<UserActivityState>()(
  persist(
    immer((set) => ({
      userActivities: new Map(),
      addUserActivity: (userActivity: UserActivity) => {
        set((state) => {
          state.userActivities.set(userActivity.id, userActivity);
        });
      },
      removeUserActivity: (userActivityId: string) => {
        set((state) => {
          state.userActivities.delete(userActivityId);
        });
      },
      setUserActivities: (userActivity: Map<string, UserActivity>) => {
        set((state) => {
          state.userActivities = userActivity;
        });
      },
      resetUserActivities: () => {
        set((state) => {
          state.userActivities = new Map();
        });
      },
    })),
    {
      name: 'user-activity-storage',
    },
  ),
);
