import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/user';
import { immer } from 'zustand/middleware/immer';

type UserState = {
    user: User | null;
    setUser: (user: User | null) => void;
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
