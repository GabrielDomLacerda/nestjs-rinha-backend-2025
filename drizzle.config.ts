import type { Config } from "drizzle-kit";

export default {
    schema: "./libs/db/schema.ts",
    out: "./libs/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;
