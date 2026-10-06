CREATE TABLE `quote_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`service` text NOT NULL,
	`budget` text NOT NULL,
	`description` text NOT NULL,
	`consent` integer NOT NULL,
	`request_fingerprint` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_quote_fingerprint_created` ON `quote_requests` (`request_fingerprint`,`created_at`);