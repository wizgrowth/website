import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_inner_meta_meta_social_platform" AS ENUM('facebook', 'twitter');
  CREATE TYPE "public"."enum_contact_meta_meta_social_platform" AS ENUM('facebook', 'twitter');
  CREATE TYPE "public"."enum_homepage_meta_meta_social_platform" AS ENUM('facebook', 'twitter');
  CREATE TYPE "public"."enum_services_meta_meta_social_platform" AS ENUM('facebook', 'twitter');
  CREATE TYPE "public"."enum_blog_home_meta_meta_social_platform" AS ENUM('facebook', 'twitter');
  CREATE TABLE IF NOT EXISTS "blog_inner_meta_meta_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_blog_inner_meta_meta_social_platform" NOT NULL,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "contact_meta_meta_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_contact_meta_meta_social_platform" NOT NULL,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "homepage_meta_meta_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_homepage_meta_meta_social_platform" NOT NULL,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "services_meta_meta_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_services_meta_meta_social_platform" NOT NULL,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "blog_home_meta_meta_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_blog_home_meta_meta_social_platform" NOT NULL,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer
  );
  
  ALTER TABLE "blog_inner" DROP CONSTRAINT "blog_inner_meta_og_image_id_media_id_fk";
  
  ALTER TABLE "contact" DROP CONSTRAINT "contact_meta_og_image_id_media_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_meta_og_image_id_media_id_fk";
  
  ALTER TABLE "services" DROP CONSTRAINT "services_meta_og_image_id_media_id_fk";
  
  ALTER TABLE "blog_home" DROP CONSTRAINT "blog_home_meta_og_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "blog_inner_meta_meta_og_image_idx";
  DROP INDEX IF EXISTS "contact_meta_meta_og_image_idx";
  DROP INDEX IF EXISTS "homepage_meta_meta_og_image_idx";
  DROP INDEX IF EXISTS "services_meta_meta_og_image_idx";
  DROP INDEX IF EXISTS "blog_home_meta_meta_og_image_idx";
  ALTER TABLE "blog_inner" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "blog_inner" ADD COLUMN "meta_meta_robots" varchar;
  ALTER TABLE "blog_inner" ADD COLUMN "meta_schema" jsonb;
  ALTER TABLE "blog_inner" ADD COLUMN "meta_canonical_url" varchar;
  ALTER TABLE "contact" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "contact" ADD COLUMN "meta_meta_robots" varchar;
  ALTER TABLE "contact" ADD COLUMN "meta_schema" jsonb;
  ALTER TABLE "contact" ADD COLUMN "meta_canonical_url" varchar;
  ALTER TABLE "homepage" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "homepage" ADD COLUMN "meta_meta_robots" varchar;
  ALTER TABLE "homepage" ADD COLUMN "meta_schema" jsonb;
  ALTER TABLE "homepage" ADD COLUMN "meta_canonical_url" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_meta_robots" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_schema" jsonb;
  ALTER TABLE "services" ADD COLUMN "meta_canonical_url" varchar;
  ALTER TABLE "blog_home" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "blog_home" ADD COLUMN "meta_meta_robots" varchar;
  ALTER TABLE "blog_home" ADD COLUMN "meta_schema" jsonb;
  ALTER TABLE "blog_home" ADD COLUMN "meta_canonical_url" varchar;
  DO $$ BEGIN
   ALTER TABLE "blog_inner_meta_meta_social" ADD CONSTRAINT "blog_inner_meta_meta_social_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_inner_meta_meta_social" ADD CONSTRAINT "blog_inner_meta_meta_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_inner"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_meta_meta_social" ADD CONSTRAINT "contact_meta_meta_social_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact_meta_meta_social" ADD CONSTRAINT "contact_meta_meta_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "homepage_meta_meta_social" ADD CONSTRAINT "homepage_meta_meta_social_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "homepage_meta_meta_social" ADD CONSTRAINT "homepage_meta_meta_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "services_meta_meta_social" ADD CONSTRAINT "services_meta_meta_social_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "services_meta_meta_social" ADD CONSTRAINT "services_meta_meta_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_home_meta_meta_social" ADD CONSTRAINT "blog_home_meta_meta_social_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_home_meta_meta_social" ADD CONSTRAINT "blog_home_meta_meta_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "blog_inner_meta_meta_social_order_idx" ON "blog_inner_meta_meta_social" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_inner_meta_meta_social_parent_id_idx" ON "blog_inner_meta_meta_social" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_inner_meta_meta_social_og_image_idx" ON "blog_inner_meta_meta_social" USING btree ("og_image_id");
  CREATE INDEX IF NOT EXISTS "contact_meta_meta_social_order_idx" ON "contact_meta_meta_social" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_meta_meta_social_parent_id_idx" ON "contact_meta_meta_social" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_meta_meta_social_og_image_idx" ON "contact_meta_meta_social" USING btree ("og_image_id");
  CREATE INDEX IF NOT EXISTS "homepage_meta_meta_social_order_idx" ON "homepage_meta_meta_social" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "homepage_meta_meta_social_parent_id_idx" ON "homepage_meta_meta_social" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "homepage_meta_meta_social_og_image_idx" ON "homepage_meta_meta_social" USING btree ("og_image_id");
  CREATE INDEX IF NOT EXISTS "services_meta_meta_social_order_idx" ON "services_meta_meta_social" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "services_meta_meta_social_parent_id_idx" ON "services_meta_meta_social" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "services_meta_meta_social_og_image_idx" ON "services_meta_meta_social" USING btree ("og_image_id");
  CREATE INDEX IF NOT EXISTS "blog_home_meta_meta_social_order_idx" ON "blog_home_meta_meta_social" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_home_meta_meta_social_parent_id_idx" ON "blog_home_meta_meta_social" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_home_meta_meta_social_og_image_idx" ON "blog_home_meta_meta_social" USING btree ("og_image_id");
  ALTER TABLE "blog_inner" DROP COLUMN IF EXISTS "meta_og_title";
  ALTER TABLE "blog_inner" DROP COLUMN IF EXISTS "meta_og_description";
  ALTER TABLE "blog_inner" DROP COLUMN IF EXISTS "meta_og_image_id";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "meta_og_title";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "meta_og_description";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "meta_og_image_id";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_og_title";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_og_description";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_og_image_id";
  ALTER TABLE "services" DROP COLUMN IF EXISTS "meta_og_title";
  ALTER TABLE "services" DROP COLUMN IF EXISTS "meta_og_description";
  ALTER TABLE "services" DROP COLUMN IF EXISTS "meta_og_image_id";
  ALTER TABLE "blog_home" DROP COLUMN IF EXISTS "meta_og_title";
  ALTER TABLE "blog_home" DROP COLUMN IF EXISTS "meta_og_description";
  ALTER TABLE "blog_home" DROP COLUMN IF EXISTS "meta_og_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_inner_meta_meta_social" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_meta_meta_social" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_meta_meta_social" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_meta_meta_social" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_home_meta_meta_social" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blog_inner_meta_meta_social" CASCADE;
  DROP TABLE "contact_meta_meta_social" CASCADE;
  DROP TABLE "homepage_meta_meta_social" CASCADE;
  DROP TABLE "services_meta_meta_social" CASCADE;
  DROP TABLE "blog_home_meta_meta_social" CASCADE;
  ALTER TABLE "blog_inner" ADD COLUMN "meta_og_title" varchar;
  ALTER TABLE "blog_inner" ADD COLUMN "meta_og_description" varchar;
  ALTER TABLE "blog_inner" ADD COLUMN "meta_og_image_id" integer;
  ALTER TABLE "contact" ADD COLUMN "meta_og_title" varchar;
  ALTER TABLE "contact" ADD COLUMN "meta_og_description" varchar;
  ALTER TABLE "contact" ADD COLUMN "meta_og_image_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "meta_og_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "meta_og_description" varchar;
  ALTER TABLE "homepage" ADD COLUMN "meta_og_image_id" integer;
  ALTER TABLE "services" ADD COLUMN "meta_og_title" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_og_description" varchar;
  ALTER TABLE "services" ADD COLUMN "meta_og_image_id" integer;
  ALTER TABLE "blog_home" ADD COLUMN "meta_og_title" varchar;
  ALTER TABLE "blog_home" ADD COLUMN "meta_og_description" varchar;
  ALTER TABLE "blog_home" ADD COLUMN "meta_og_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "blog_inner" ADD CONSTRAINT "blog_inner_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact" ADD CONSTRAINT "contact_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "homepage" ADD CONSTRAINT "homepage_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "services" ADD CONSTRAINT "services_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_home" ADD CONSTRAINT "blog_home_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "blog_inner_meta_meta_og_image_idx" ON "blog_inner" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "contact_meta_meta_og_image_idx" ON "contact" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "homepage_meta_meta_og_image_idx" ON "homepage" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "services_meta_meta_og_image_idx" ON "services" USING btree ("meta_og_image_id");
  CREATE INDEX IF NOT EXISTS "blog_home_meta_meta_og_image_idx" ON "blog_home" USING btree ("meta_og_image_id");
  ALTER TABLE "blog_inner" DROP COLUMN IF EXISTS "meta_keywords";
  ALTER TABLE "blog_inner" DROP COLUMN IF EXISTS "meta_meta_robots";
  ALTER TABLE "blog_inner" DROP COLUMN IF EXISTS "meta_schema";
  ALTER TABLE "blog_inner" DROP COLUMN IF EXISTS "meta_canonical_url";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "meta_keywords";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "meta_meta_robots";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "meta_schema";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "meta_canonical_url";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_keywords";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_meta_robots";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_schema";
  ALTER TABLE "homepage" DROP COLUMN IF EXISTS "meta_canonical_url";
  ALTER TABLE "services" DROP COLUMN IF EXISTS "meta_keywords";
  ALTER TABLE "services" DROP COLUMN IF EXISTS "meta_meta_robots";
  ALTER TABLE "services" DROP COLUMN IF EXISTS "meta_schema";
  ALTER TABLE "services" DROP COLUMN IF EXISTS "meta_canonical_url";
  ALTER TABLE "blog_home" DROP COLUMN IF EXISTS "meta_keywords";
  ALTER TABLE "blog_home" DROP COLUMN IF EXISTS "meta_meta_robots";
  ALTER TABLE "blog_home" DROP COLUMN IF EXISTS "meta_schema";
  ALTER TABLE "blog_home" DROP COLUMN IF EXISTS "meta_canonical_url";
  DROP TYPE "public"."enum_blog_inner_meta_meta_social_platform";
  DROP TYPE "public"."enum_contact_meta_meta_social_platform";
  DROP TYPE "public"."enum_homepage_meta_meta_social_platform";
  DROP TYPE "public"."enum_services_meta_meta_social_platform";
  DROP TYPE "public"."enum_blog_home_meta_meta_social_platform";`)
}
