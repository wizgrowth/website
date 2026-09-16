import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { ServicePage } from '@/payload-types';

// One Payload query per request, shared by the page, its metadata and the
// "other services" strip.
// A query that fails because the database schema is behind the code (a
// preview database, or a production build racing the migration workflow)
// must not take the build down. Empty results render empty sections and
// ISR fills them in once the migration has run.
function schemaBehind(err: unknown) {
  console.error('[servicePages] query failed; rendering without services:', err);
  return [] as ServicePage[];
}

export const getServices = cache(async (): Promise<ServicePage[]> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'servicePages',
      limit: 0,
      depth: 0,
      sort: 'order',
    });
    return result.docs;
  } catch (err) {
    return schemaBehind(err);
  }
});

export const getService = cache(async (slug: string): Promise<ServicePage | undefined> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'servicePages',
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return result.docs[0];
  } catch (err) {
    schemaBehind(err);
    return undefined;
  }
});
