import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  CREATE INDEX IF NOT EXISTS "blog_home_meta_meta_og_image_idx" ON "blog_home" USING btree ("meta_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
