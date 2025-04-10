CREATE TABLE "flashcards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_flashcard_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"author_id" text NOT NULL,
	"note_id" uuid NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"public" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "flashcards_public_flashcard_id_unique" UNIQUE("public_flashcard_id")
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_note_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"author_id" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"keywords" text[10],
	"public" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "notes_public_note_id_unique" UNIQUE("public_note_id"),
	CONSTRAINT "notes_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"public_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "author_note_index" ON "flashcards" USING btree ("author_id","note_id");--> statement-breakpoint
CREATE INDEX "author_public_card_index" ON "flashcards" USING btree ("author_id","public");--> statement-breakpoint
CREATE INDEX "public_index" ON "flashcards" USING btree ("public");--> statement-breakpoint
CREATE INDEX "public_author_index" ON "notes" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "author_public_note_index" ON "notes" USING btree ("author_id","public");--> statement-breakpoint
CREATE INDEX "keyword_index" ON "notes" USING btree ("keywords");--> statement-breakpoint
CREATE INDEX "title_index" ON "notes" USING btree ("title");