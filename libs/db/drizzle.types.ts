import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export type PgDatabase = ReturnType<typeof drizzle<typeof schema>>;
