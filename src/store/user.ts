import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { User } from '@/types/user';

export type UserState = {
    user: null | User;
    setUser: (user: null | User) => void;
    resetUser: () => void;
};

export const useUserStore = create<UserState>()(
    persist(
        immer((set) => ({
            user: null,
            setUser: (user) => {
                set((state) => {
                    state.user = user;
                });
            },
            resetUser: () => {
                set((state) => {
                    state.user = null;
                });
            },
        })),
        {
            name: 'user-storage',
        },
    ),
);
