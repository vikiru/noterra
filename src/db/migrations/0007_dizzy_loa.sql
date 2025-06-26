ALTER TABLE "notes" DROP CONSTRAINT "notes_title_unique";--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "author_title_unique" UNIQUE("author_id","title");