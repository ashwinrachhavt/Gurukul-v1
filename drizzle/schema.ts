import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, int, varchar, index, bigint, text } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const authors = mysqlTable("authors", {
	id: int("id").autoincrement().notNull(),
	author: varchar("author", { length: 255 }).notNull(),
},
(table) => {
	return {
		authorsId: primaryKey(table.id),
		author: unique("author").on(table.author),
	}
});

export const categories = mysqlTable("categories", {
	id: int("id").autoincrement().notNull(),
	category: varchar("category", { length: 255 }).notNull(),
},
(table) => {
	return {
		categoriesId: primaryKey(table.id),
		category: unique("category").on(table.category),
	}
});

export const courses = mysqlTable("courses", {
	id: int("id").autoincrement().notNull(),
	course: varchar("course", { length: 100 }).notNull(),
	authorId: int("author_id").notNull(),
	categoryId: int("category_id").notNull(),
},
(table) => {
	return {
		authorIdIdx: index("author_id_idx").on(table.authorId),
		categoryIdIdx: index("category_id_idx").on(table.categoryId),
		coursesId: primaryKey(table.id),
		course: unique("course").on(table.course),
	}
});

export const submissions = mysqlTable("submissions", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	userid: varchar("userid", { length: 255 }).default('null').notNull(),
	languageId: int("language_id").notNull(),
	sourceCode: text("source_code").notNull(),
	stdin: varchar("stdin", { length: 255 }).default('').notNull(),
	outputStatus: varchar("output_status", { length: 255 }).default('pending').notNull(),
	outputMemory: text("output_memory").notNull(),
	outputTime: varchar("output_time", { length: 255 }).notNull(),
},
(table) => {
	return {
		submissionsId: primaryKey(table.id),
	}
});