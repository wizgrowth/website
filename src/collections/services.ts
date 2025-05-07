import type { GlobalConfig } from 'payload'

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
}
