ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_author_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_note_id_notes_id_fk";
--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "notes_author_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;