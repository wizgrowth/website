import type { CollectionConfig } from 'payload'

export const DemoBooking: CollectionConfig = {
  slug: 'demobooking',
  // Bookings hold names and emails. The contact form writes them through
  // src/app/api/booking/route.ts (the local API, server side), so nothing
  // here needs to be open to the public.
  access: {
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
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
