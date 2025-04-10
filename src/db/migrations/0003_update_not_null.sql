ALTER TABLE "flashcards" ALTER COLUMN "public_author_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcards" ALTER COLUMN "public_note_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "keywords" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "public_author_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_public_author_id_users_public_id_fk" FOREIGN KEY ("public_author_id") REFERENCES "public"."users"("public_id") ON DELETE no action ON UPDATE no action;