import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_service_pages_meta_meta_social_platform" AS ENUM('facebook', 'twitter');
  CREATE TABLE "service_pages_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_meta_meta_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_service_pages_meta_meta_social_platform" NOT NULL,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer
  );
  
  CREATE TABLE "service_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"h1" varchar NOT NULL,
  	"h1_accent" varchar,
  	"lead" varchar,
  	"card" varchar,
  	"card_cta" varchar DEFAULT 'Learn more',
  	"honesty" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"meta_meta_robots" varchar,
  	"meta_schema" jsonb,
  	"meta_canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_pages_id" integer;
  ALTER TABLE "service_pages_steps" ADD CONSTRAINT "service_pages_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_includes" ADD CONSTRAINT "service_pages_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_faqs" ADD CONSTRAINT "service_pages_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_meta_meta_social" ADD CONSTRAINT "service_pages_meta_meta_social_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_pages_meta_meta_social" ADD CONSTRAINT "service_pages_meta_meta_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages" ADD CONSTRAINT "service_pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "service_pages_steps_order_idx" ON "service_pages_steps" USING btree ("_order");
  CREATE INDEX "service_pages_steps_parent_id_idx" ON "service_pages_steps" USING btree ("_parent_id");
  CREATE INDEX "service_pages_includes_order_idx" ON "service_pages_includes" USING btree ("_order");
  CREATE INDEX "service_pages_includes_parent_id_idx" ON "service_pages_includes" USING btree ("_parent_id");
  CREATE INDEX "service_pages_faqs_order_idx" ON "service_pages_faqs" USING btree ("_order");
  CREATE INDEX "service_pages_faqs_parent_id_idx" ON "service_pages_faqs" USING btree ("_parent_id");
  CREATE INDEX "service_pages_meta_meta_social_order_idx" ON "service_pages_meta_meta_social" USING btree ("_order");
  CREATE INDEX "service_pages_meta_meta_social_parent_id_idx" ON "service_pages_meta_meta_social" USING btree ("_parent_id");
  CREATE INDEX "service_pages_meta_meta_social_og_image_idx" ON "service_pages_meta_meta_social" USING btree ("og_image_id");
  CREATE UNIQUE INDEX "service_pages_slug_idx" ON "service_pages" USING btree ("slug");
  CREATE INDEX "service_pages_meta_meta_image_idx" ON "service_pages" USING btree ("meta_image_id");
  CREATE INDEX "service_pages_updated_at_idx" ON "service_pages" USING btree ("updated_at");
  CREATE INDEX "service_pages_created_at_idx" ON "service_pages" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_pages_fk" FOREIGN KEY ("service_pages_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_service_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("service_pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_pages_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_includes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_meta_meta_social" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "service_pages_steps" CASCADE;
  DROP TABLE "service_pages_includes" CASCADE;
  DROP TABLE "service_pages_faqs" CASCADE;
  DROP TABLE "service_pages_meta_meta_social" CASCADE;
  DROP TABLE "service_pages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_service_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_pages_id";
  DROP TYPE "public"."enum_service_pages_meta_meta_social_platform";`)
}
