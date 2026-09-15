import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Note: the `media.prefix` line below is IF NOT EXISTS on purpose. The column
// already exists in every environment (added by 20250622_194700_init) but is
// missing from the snapshot JSONs, so migrate:create emits it as new. Rolling
// it back is deliberately omitted from down() — this migration did not create it.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_blog_inner_category" ADD VALUE 'career';
  ALTER TYPE "public"."enum_blog_inner_category" ADD VALUE 'seo-content';
  ALTER TYPE "public"."enum_blog_inner_category" ADD VALUE 'tools';
  ALTER TYPE "public"."enum_blog_inner_category" ADD VALUE 'local-business';
  ALTER TYPE "public"."enum_blog_inner_category" ADD VALUE 'academy';
  CREATE TABLE "blog_inner_tldr" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "blog_inner_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "blog_inner_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_inner_id" integer
  );
  
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar DEFAULT 'media';
  ALTER TABLE "blog_inner" ADD COLUMN "dek" varchar;
  ALTER TABLE "blog_inner" ADD COLUMN "crumb" varchar;
  ALTER TABLE "blog_inner" ADD COLUMN "published_date" timestamp(3) with time zone;
  ALTER TABLE "blog_inner_tldr" ADD CONSTRAINT "blog_inner_tldr_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_inner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_inner_faqs" ADD CONSTRAINT "blog_inner_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_inner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_inner_rels" ADD CONSTRAINT "blog_inner_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_inner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_inner_rels" ADD CONSTRAINT "blog_inner_rels_blog_inner_fk" FOREIGN KEY ("blog_inner_id") REFERENCES "public"."blog_inner"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_inner_tldr_order_idx" ON "blog_inner_tldr" USING btree ("_order");
  CREATE INDEX "blog_inner_tldr_parent_id_idx" ON "blog_inner_tldr" USING btree ("_parent_id");
  CREATE INDEX "blog_inner_faqs_order_idx" ON "blog_inner_faqs" USING btree ("_order");
  CREATE INDEX "blog_inner_faqs_parent_id_idx" ON "blog_inner_faqs" USING btree ("_parent_id");
  CREATE INDEX "blog_inner_rels_order_idx" ON "blog_inner_rels" USING btree ("order");
  CREATE INDEX "blog_inner_rels_parent_idx" ON "blog_inner_rels" USING btree ("parent_id");
  CREATE INDEX "blog_inner_rels_path_idx" ON "blog_inner_rels" USING btree ("path");
  CREATE INDEX "blog_inner_rels_blog_inner_id_idx" ON "blog_inner_rels" USING btree ("blog_inner_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blog_inner_tldr" CASCADE;
  DROP TABLE "blog_inner_faqs" CASCADE;
  DROP TABLE "blog_inner_rels" CASCADE;
  ALTER TABLE "blog_inner_category" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_blog_inner_category";
  CREATE TYPE "public"."enum_blog_inner_category" AS ENUM('general', 'best of', 'ai');
  ALTER TABLE "blog_inner_category" ALTER COLUMN "value" SET DATA TYPE "public"."enum_blog_inner_category" USING "value"::"public"."enum_blog_inner_category";
  ALTER TABLE "blog_inner" DROP COLUMN "dek";
  ALTER TABLE "blog_inner" DROP COLUMN "crumb";
  ALTER TABLE "blog_inner" DROP COLUMN "published_date";`)
}
