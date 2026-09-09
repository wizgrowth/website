import type { CollectionConfig } from 'payload'

export const DemoBooking: CollectionConfig = {
  slug: 'demobooking',
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'Name', // required
      type: 'text', // required
      required: true,
    },
    {
      name: 'Email', // required
      type: 'text', // required
      required: true,
    },
    {
      name: 'Date', // required
      type: 'text', // required
      required: true,
    },
    {
      name: 'Time', // required
      type: 'text', // required
      required: true,
    },
  ],
}
