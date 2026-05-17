import type { GlobalConfig } from 'payload';

export const Academy: GlobalConfig = {
  slug: 'academy',
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
};
