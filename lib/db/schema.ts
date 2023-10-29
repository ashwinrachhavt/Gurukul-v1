import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authId: varchar("auth_id", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  profilePictureUrl: varchar("profile_picture_url", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof users.$inferSelect
export type CreateUser = typeof users.$inferInsert

export const submissions_test = pgTable("submissions_test", {
  id: serial("id").primaryKey(),
  language: varchar("language", { length: 256 }).notNull(),
  sourceCode: text("source_code").notNull(),
  userId: text("user_id").notNull(),

  // Add any other necessary columns here
});

export type Submission = typeof submissions_test.$inferSelect;
export type CreateSubmission = typeof submissions_test.$inferInsert;