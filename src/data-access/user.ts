import { User, UserCreate, UserUpdate } from '@/types/user';
import { db } from '@/db';
import * as z from 'zod';
import { flashcardsTable, notesTable, usersTable } from '@/db/schema';
import { userSchema } from '@/schema';
import { and, eq, gte, sql } from 'drizzle-orm';

export async function createUser(user: UserCreate) {
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
                name: data.name,
                profileImage: data.profileImage,
                username: data.username,
                email: data.email,
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

export async function updateUser(updatedUser: UserUpdate) {
    try {
        const result = userSchema.update.safeParse(updatedUser);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user data provided. Please try again with valid data.',
            );
        }
        const data = result.data;
        const updated = await db
            .update(usersTable)
            .set({
                name: data.name,
                profileImage: data.profileImage,
                bio: data.bio,
                country: data.country,
            })
            .where(eq(usersTable.clerkId, data.clerkId))
            .returning();
        const user = updated[0];
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUserById(id: string) {
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

export async function getUserActivityOverview(id: string) {
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
                sql`${notesTable.publicAuthorId} = ${userId} AND ${notesTable.createdAt} >= ${startDate}`,
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

export async function getTotalCreations(id: string) {
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
            .where(sql`${notesTable.publicAuthorId} = ${userId}`);
        return total.length > 0 ? total[0] : { notes: 0, flashcards: 0 };
    } catch (error) {
        console.error(`Error getting total creations with id ${id}:`, error);
        throw error;
    }
}
