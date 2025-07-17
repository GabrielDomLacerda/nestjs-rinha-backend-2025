import { Provider } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { PgDatabase } from "./drizzle.types";

export const DRIZZLE = Symbol("PG_DRIZZLE");

export const DrizzleProvider: Provider = {
    provide: DRIZZLE,
    useFactory: (): PgDatabase => {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        return drizzle(pool, { schema });
    },
};
