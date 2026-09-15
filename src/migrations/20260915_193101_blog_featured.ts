import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_blog_inner_category" ADD VALUE 'business-owners';
  ALTER TABLE "blog_inner" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "blog_inner" ADD COLUMN "featured_label" varchar;
  ALTER TABLE "blog_inner" ADD COLUMN "featured_stat" varchar;
  ALTER TABLE "blog_inner" ADD COLUMN "featured_stat_caption" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_inner_category" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_blog_inner_category";
  CREATE TYPE "public"."enum_blog_inner_category" AS ENUM('general', 'best of', 'ai', 'career', 'seo-content', 'tools', 'local-business', 'academy');
  ALTER TABLE "blog_inner_category" ALTER COLUMN "value" SET DATA TYPE "public"."enum_blog_inner_category" USING "value"::"public"."enum_blog_inner_category";
  ALTER TABLE "blog_inner" DROP COLUMN "featured";
  ALTER TABLE "blog_inner" DROP COLUMN "featured_label";
  ALTER TABLE "blog_inner" DROP COLUMN "featured_stat";
  ALTER TABLE "blog_inner" DROP COLUMN "featured_stat_caption";`)
}
