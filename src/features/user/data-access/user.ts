import { eq, sql } from 'drizzle-orm';
import { db } from '@/db/index';
import { flashcardsTable, notesTable, usersTable } from '@/lib/db/schema';
import type { TotalCreations } from '@/user/types/totalCreations';
import type { UserCreate, UserUpdate } from '@/user/types/user';

export async function insertUser(user: UserCreate) {
  const result = await db.insert(usersTable).values(user).returning();
  return result[0];
}

export async function findUserById(id: string) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, id));
  return result[0];
}

export async function findUserByUsername(username: string) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));
  return result[0];
}

export async function findUserTotalCreations(
  id: string,
): Promise<TotalCreations> {
  const result: TotalCreations[] = await db
    .select({
      notes: sql<number>`COUNT(DISTINCT ${notesTable.id})`,
      flashcards: sql<number>`COUNT(DISTINCT ${flashcardsTable.id})`,
    })
    .from(notesTable)
    .leftJoin(
      flashcardsTable,
      sql`${flashcardsTable.noteId} = ${notesTable.id}`,
    )
    .where(sql`${notesTable.authorId} = ${id}`);
  const returnData =
    result.length > 0 ? result[0] : { notes: 0, flashcards: 0 };
  return returnData;
}

export async function findUserActivityOverview(id: string) {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 29);
  const result = await db
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
      sql`${notesTable.authorId} = ${id} AND ${notesTable.createdAt} >= ${startDate}`,
    )
    .groupBy(sql`DATE(${notesTable.createdAt})`)
    .orderBy(sql`DATE(${notesTable.createdAt})`);
  return result;
}

export async function updateUser(user: UserUpdate) {
  const result = await db
    .update(usersTable)
    .set(user)
    .where(eq(usersTable.clerkId, user.clerkId))
    .returning();
  return result[0];
}
