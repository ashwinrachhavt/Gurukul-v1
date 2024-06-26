import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
    path: ".env"
});

export default {
    driver: 'mysql2',
    schema: './lib/db/schema.ts',
    out: "./drizzle",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;