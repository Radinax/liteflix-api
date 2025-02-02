CREATE TABLE `files` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`content` blob NOT NULL,
	`movieId` integer,
	FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`image` text NOT NULL
);
