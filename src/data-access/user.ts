import { eq, sql } from 'drizzle-orm';
import * as z from 'zod/v4';
import { db } from '@/db';
import { flashcardsTable, notesTable, usersTable } from '@/db/schema';
import { userSchema } from '@/schema/databaseSchema';
import type { ActivityOverview } from '@/types/activityOverview';
import type { ResponseData } from '@/types/response';
import type { TotalCreations } from '@/types/totalCreations';
import type { User, UserCreate, UserUpdate } from '@/types/user';

export async function createUser(
    user: UserCreate,
): Promise<ResponseData<User>> {
    try {
        const result = userSchema.insert.safeParse(user);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user data provided. Please try again with valid data.',
            };
        }
        const validatedUser = result.data;
        const newUser = await db
            .insert(usersTable)
            .values({
                clerkId: validatedUser.clerkId,
                username: validatedUser.username,
                email: validatedUser.email,
                firstName: validatedUser.firstName,
                lastName: validatedUser.lastName,
                bio: validatedUser.bio,
                country: validatedUser.country,
            })
            .returning();
        if (!newUser) {
            return {
                success: false,
                error: 'Failed to create user. Please try again.',
            };
        }
        return { success: true, data: newUser[0] };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'An unexpected error occured while creating user. Please try again.',
        };
    }
}

export async function retrieveTotalCreations(
    id: string,
): Promise<ResponseData<TotalCreations>> {
    try {
        const result = z.uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user id provided. Please try again with a valid id.',
            };
        }
        const validatedId = result.data;
        const total = await db
            .select({
                notes: sql<number>`COUNT(DISTINCT ${notesTable.id})`,
                flashcards: sql<number>`COUNT(DISTINCT ${flashcardsTable.id})`,
            })
            .from(notesTable)
            .leftJoin(
                flashcardsTable,
                sql`${flashcardsTable.noteId} = ${notesTable.id}`,
            )
            .where(sql`${notesTable.authorId} = ${validatedId}`);
        const returnData =
            total.length > 0 ? total[0] : { notes: 0, flashcards: 0 };
        return { success: true, data: returnData };
    } catch (error) {
        console.error(`Error getting total creations with id ${id}:`, error);
        return {
            success: false,
            error: 'An unexpected error occured while fetching the total creations. Please try again.',
        };
    }
}

export async function retrieveUserActivityOverview(
    id: string,
): Promise<ResponseData<ActivityOverview[]>> {
    try {
        const result = z.uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user id provided. Please try again with a valid id.',
            };
        }
        const validatedId = result.data;
        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - 29);

        const activity = await db
            .select({
                date: sql<string>`DATE(${notesTable.createdAt})`,
                notes: sql<number>`COUNT(DISTINCT ${notesTable.id})`,
                flashcards: sql<number>`COUNT(DISTINCT ${flashcardsTable.id})`,
            })
            .from(notesTable)
            .leftJoin(
                flashcardsTable,
                sql`${flashcardsTable.noteId} = ${notesTable.id}`,
            )
            .where(
                sql`${notesTable.authorId} = ${validatedId} AND ${notesTable.createdAt} >= ${startDate}`,
            )
            .groupBy(sql`DATE(${notesTable.createdAt})`)
            .orderBy(sql`DATE(${notesTable.createdAt})`);
        return { success: true, data: activity };
    } catch (error) {
        console.error(
            `Error getting user activity overview with id ${id}:`,
            error,
        );
        return {
            success: false,
            error: 'An unexpected error occured while fetching the activity overview. Please try again.',
        };
    }
}

export async function retrieveUserById(
    id: string,
): Promise<ResponseData<User>> {
    try {
        const result = z.uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user id provided. Please try again with a valid id.',
            };
        }
        const validatedId = result.data;
        const userResult = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.clerkId, validatedId));
        if (!userResult) {
            return {
                success: false,
                error: 'No user found',
            };
        }
        return { success: true, data: userResult[0] };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'There was an error retrieving the user by id.',
        };
    }
}

export async function updateUser(
    user: UserUpdate,
): Promise<ResponseData<User>> {
    try {
        const result = userSchema.update.safeParse(user);
        if (!result.success) {
            console.error(result.error);
            return { success: false, error: 'Invalid user data provided.' };
        }
        const validatedUser = result.data;
        const userResult = await db
            .update(usersTable)
            .set({
                firstName: validatedUser.firstName,
                lastName: validatedUser.lastName,
                bio: validatedUser.bio,
                country: validatedUser.country,
            })
            .where(eq(usersTable.clerkId, validatedUser.clerkId))
            .returning();
        if (!userResult) {
            return { success: false, error: 'Failed to update user.' };
        }
        return { success: true, data: userResult[0] };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'There was an error updating the user.',
        };
    }
}
