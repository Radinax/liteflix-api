import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { join } from "node:path";

const client = createClient({
  url: process.env.DB_URL!,
  authToken: process.env.DB_TOKEN!,
});

export const applyMigrations = () =>
  migrate(db, { migrationsFolder: join(import.meta.dirname, "migrations") });

export const db = drizzle(client);
