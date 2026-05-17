import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_academy_meta_meta_social_platform" AS ENUM('facebook', 'twitter');
  CREATE TABLE "academy_meta_meta_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_academy_meta_meta_social_platform" NOT NULL,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer
  );
  
  CREATE TABLE "academy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"meta_meta_robots" varchar,
  	"meta_schema" jsonb,
  	"meta_canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "academy_meta_meta_social" ADD CONSTRAINT "academy_meta_meta_social_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "academy_meta_meta_social" ADD CONSTRAINT "academy_meta_meta_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."academy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "academy" ADD CONSTRAINT "academy_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "academy_meta_meta_social_order_idx" ON "academy_meta_meta_social" USING btree ("_order");
  CREATE INDEX "academy_meta_meta_social_parent_id_idx" ON "academy_meta_meta_social" USING btree ("_parent_id");
  CREATE INDEX "academy_meta_meta_social_og_image_idx" ON "academy_meta_meta_social" USING btree ("og_image_id");
  CREATE INDEX "academy_meta_meta_image_idx" ON "academy" USING btree ("meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "academy_meta_meta_social" CASCADE;
  DROP TABLE "academy" CASCADE;
  DROP TYPE "public"."enum_academy_meta_meta_social_platform";`)
}
