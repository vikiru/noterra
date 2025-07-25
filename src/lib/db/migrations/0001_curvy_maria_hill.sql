DROP INDEX "author_public_card_index";--> statement-breakpoint
DROP INDEX "public_index";--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "show_cards" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "note_card_index" ON "flashcards" USING btree ("note_id");--> statement-breakpoint
CREATE INDEX "author_public_card_index" ON "notes" USING btree ("author_id","show_cards");--> statement-breakpoint
ALTER TABLE "flashcards" DROP COLUMN "public";