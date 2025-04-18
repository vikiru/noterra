ALTER TABLE "notes" ADD COLUMN "summary" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "shared" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "share_token" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_image" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "bio" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country" text DEFAULT '' NOT NULL;--> statement-breakpoint
CREATE INDEX "author_shared_note_index" ON "notes" USING btree ("author_id","shared");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_share_token_unique" UNIQUE("share_token");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");