'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
    createUser,
    retrieveTotalCreations,
    retrieveUserActivityOverview,
    retrieveUserById,
    updateUser,
} from '@/data-access/user';
import type { ActivityOverview } from '@/types/activityOverview';
import type { TotalCreations } from '@/types/totalCreations';
import type { User, UserCreate, UserUpdate } from '@/types/user';

export async function addUser(user: UserCreate): Promise<User> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const newUser = await createUser(user);
        return newUser;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export async function modifyUser(user: UserUpdate): Promise<User> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const updatedUser = await updateUser(user);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function fetchUserById(): Promise<User> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const user = await retrieveUserById(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        throw error;
    }
}

export async function fetchUserActivityOverview(): Promise<ActivityOverview[]> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const activityOverview = await retrieveUserActivityOverview(userId);
        return activityOverview;
    } catch (error) {
        console.error('Error fetching user activity overview:', error);
        throw error;
    }
}
export async function fetchTotalCreations(): Promise<TotalCreations> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const totalCreations = await retrieveTotalCreations(userId);
        return totalCreations;
    } catch (error) {
        console.error(`Error getting total creations:`, error);
        throw error;
    }
}
