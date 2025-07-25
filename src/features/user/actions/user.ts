'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import type { ResponseData } from '@/types/response';
import {
    createUser,
    retrieveTotalCreations,
    retrieveUserActivityOverview,
    retrieveUserById,
    updateUser,
} from '@/user/data-access/user';
import type { ActivityOverview } from '@/user/types/activityOverview';
import type { TotalCreations } from '@/user/types/totalCreations';
import type { User, UserCreate, UserUpdate } from '@/user/types/user';

// TODO: refac all actions to account for Response type.
// TODO: rename response type to something else.
export async function addUser(user: UserCreate): Promise<ResponseData<User>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await createUser(user);
        return result;
    } catch (error) {
        console.error('Error adding user:', error);
        return {
            success: false,
            error: 'There was an error adding the user',
        };
    }
}

export async function fetchTotalCreations(): Promise<
    ResponseData<TotalCreations>
> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrieveTotalCreations(userId);
        return result;
    } catch (error) {
        console.error(`Error getting total creations:`, error);
        return {
            success: false,
            error: 'There was an error getting the total creations.',
        };
    }
}

export async function fetchUserActivityOverview(): Promise<
    ResponseData<ActivityOverview[]>
> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrieveUserActivityOverview(userId);
        return result;
    } catch (error) {
        console.error('Error fetching user activity overview:', error);
        return {
            success: false,
            error: 'There was an error fetching the user activity overview.',
        };
    }
}

export async function fetchUserById(): Promise<ResponseData<User>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrieveUserById(userId);
        return result;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        return {
            success: false,
            error: 'There was an error fetching the user.',
        };
    }
}

export async function modifyUser(
    user: UserUpdate,
): Promise<ResponseData<User>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await updateUser(user);
        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        return {
            success: false,
            error: 'There was an error updating the user.',
        };
    }
}
