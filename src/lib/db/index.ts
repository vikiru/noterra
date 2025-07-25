import { drizzle } from 'drizzle-orm/node-postgres';

import { databaseUrl } from '@/config';

export const db = drizzle(databaseUrl);
