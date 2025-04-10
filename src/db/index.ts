import { databaseUrl } from '@/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(databaseUrl);
