-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `authors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author` varchar(255) NOT NULL,
	CONSTRAINT `authors_id` PRIMARY KEY(`id`),
	CONSTRAINT `author` UNIQUE(`author`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(255) NOT NULL,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `category` UNIQUE(`category`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`course` varchar(100) NOT NULL,
	`author_id` int NOT NULL,
	`category_id` int NOT NULL,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `course` UNIQUE(`course`)
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`userid` varchar(255) NOT NULL,
	`language_id` int NOT NULL,
	`source_code` text NOT NULL,
	`stdin` text NOT NULL,
	`output_status` json NOT NULL,
	`output_memory` int NOT NULL,
	`output_time` varchar(255) NOT NULL,
	CONSTRAINT `submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `author_id_idx` ON `courses` (`author_id`);--> statement-breakpoint
CREATE INDEX `category_id_idx` ON `courses` (`category_id`);
*/