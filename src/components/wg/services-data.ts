import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { ServicePage } from '@/payload-types';

// One Payload query per request, shared by the page, its metadata and the
// "other services" strip.
export const getServices = cache(async (): Promise<ServicePage[]> => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'servicePages',
    limit: 0,
    depth: 0,
    sort: 'order',
  });
  return result.docs;
});

export const getService = cache(async (slug: string): Promise<ServicePage | undefined> => {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'servicePages',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
});
