import { defineConfig } from 'drizzle-kit';

import { databaseUrl } from '@/config';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
  strict: true,
  verbose: true,
});

// 1. npx drizzle-kit push
// OR
// 1. npx drizzle-kit generate --name <migration_name>
// 2. npx drizzle-kit migrate
// 3. npx drizzle-kit push

// npx drizzle-kit studio OR npm run studio
