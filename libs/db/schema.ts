import { decimal, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const paymentType = pgEnum("payment_type", ["default", "fallback"]);

export const payments = pgTable("payments", {
    correlationId: uuid("correlationId").primaryKey(),
    amount: decimal("amount", { precision: 20, scale: 2 }).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
    type: paymentType("type").notNull(),
});
