import type { GlobalConfig } from 'payload';
import { revalidateHook } from '@/lib/revalidate';

export const Services: GlobalConfig = {
  slug: 'services',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'Title', // required
      type: 'text', // required
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateHook(['/services'])],
  },
};
