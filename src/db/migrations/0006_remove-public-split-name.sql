ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_public_flashcard_id_unique";--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "notes_public_note_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_public_id_unique";--> statement-breakpoint
ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_public_author_id_users_public_id_fk";
--> statement-breakpoint
ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_public_note_id_notes_public_note_id_fk";
--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "notes_public_author_id_users_public_id_fk";
--> statement-breakpoint
DROP INDEX "public_author_index";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcards" DROP COLUMN "public_flashcard_id";--> statement-breakpoint
ALTER TABLE "flashcards" DROP COLUMN "public_author_id";--> statement-breakpoint
ALTER TABLE "flashcards" DROP COLUMN "public_note_id";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN "public_note_id";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN "public_author_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "public_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";