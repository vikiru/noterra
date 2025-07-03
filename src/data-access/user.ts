import { and, eq, gte, sql } from 'drizzle-orm';
import * as z from 'zod';

import type { ActivityOverview } from '@/types/activityOverview';
import type { TotalCreations } from '@/types/totalCreations';
import type { User, UserCreate, UserUpdate } from '@/types/user';

import { db } from '@/db';
import { flashcardsTable, notesTable, usersTable } from '@/db/schema';
import { userSchema } from '@/schema/databaseSchema';

export async function createUser(user: UserCreate): Promise<User> {
    try {
        const result = userSchema.insert.safeParse(user);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user data provided, please try again with valid credentials.',
            );
        }
        const data = result.data;
        const newUser = await db
            .insert(usersTable)
            .values({
                clerkId: data.clerkId,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                country: data.country,
            })
            .returning();
        return newUser[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function retrieveTotalCreations(
    id: string,
): Promise<TotalCreations> {
    try {
        const result = z.string().uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user id provided. Please try again with a valid id.',
            );
        }
        const userId = result.data;
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
            .where(sql`${notesTable.authorId} = ${userId}`);
        return total.length > 0 ? total[0] : { notes: 0, flashcards: 0 };
    } catch (error) {
        console.error(`Error getting total creations with id ${id}:`, error);
        throw error;
    }
}

export async function retrieveUserActivityOverview(
    id: string,
): Promise<ActivityOverview[]> {
    try {
        const result = z.string().uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user id provided. Please try again with a valid id.',
            );
        }
        const userId = result.data;
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
                sql`${notesTable.authorId} = ${userId} AND ${notesTable.createdAt} >= ${startDate}`,
            )
            .groupBy(sql`DATE(${notesTable.createdAt})`)
            .orderBy(sql`DATE(${notesTable.createdAt})`);
        return activity;
    } catch (error) {
        console.error(
            `Error getting user activity overview with id ${id}:`,
            error,
        );
        throw error;
    }
}

export async function retrieveUserById(id: string): Promise<User> {
    try {
        const result = z.string().uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user id provided. Please try again with a valid id.',
            );
        }
        const data = result.data;
        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.clerkId, data));
        return user[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateUser(user: UserUpdate): Promise<User> {
    try {
        const result = userSchema.update.safeParse(user);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user data provided. Please try again with valid data.',
            );
        }
        const data = result.data;
        const updatedData = await db
            .update(usersTable)
            .set({
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                country: data.country,
            })
            .where(eq(usersTable.clerkId, data.clerkId))
            .returning();
        const updatedUser = updatedData[0];
        return updatedUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
