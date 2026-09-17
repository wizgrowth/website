import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_inner" ADD COLUMN "hide_from_sitemap" boolean DEFAULT false;
  UPDATE "blog_inner" SET "hide_from_sitemap" = true WHERE trim("slug") = 'first-freelance-digital-marketing-client';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_inner" DROP COLUMN "hide_from_sitemap";`)
}
