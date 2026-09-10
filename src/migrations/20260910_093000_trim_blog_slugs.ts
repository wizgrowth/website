import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Some blog_inner rows were saved with whitespace around the slug. The sitemap
// trims before emitting a URL, so those posts get advertised at a clean URL
// that then 404s, because the page lookup matches the slug exactly.
//
// Trimming the stored value fixes both ends. blog-inner.ts trims in
// beforeChange, so this only cleans up what is already there.
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const before = await db.execute(
    sql`SELECT id, slug FROM "blog_inner" WHERE slug <> btrim(slug);`,
  )

  const rows = (before as unknown as { rows?: { id: number; slug: string }[] }).rows ?? []

  for (const row of rows) {
    payload.logger.info(`trimming blog_inner slug ${row.id}: "${row.slug}" -> "${row.slug.trim()}"`)
  }

  // Only rewrite rows where trimming would not collide with an existing slug.
  await db.execute(sql`
    UPDATE "blog_inner" AS b
    SET slug = btrim(b.slug)
    WHERE b.slug <> btrim(b.slug)
      AND NOT EXISTS (
        SELECT 1 FROM "blog_inner" AS other
        WHERE other.id <> b.id AND other.slug = btrim(b.slug)
      );`)

  payload.logger.info(`trim_blog_slugs: ${rows.length} row(s) needed trimming`)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Restoring the stray whitespace would only recreate broken URLs.
  payload.logger.info('trim_blog_slugs: nothing to undo')
}
