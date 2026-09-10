import type { CollectionConfig } from 'payload'

export const DemoBooking: CollectionConfig = {
  slug: 'demobooking',
  access: {
    // Rows hold customer names and email addresses, so reading requires a
    // signed-in user. Previously this was `() => true`, which exposed every
    // booking through the public REST and GraphQL API.
    read: ({ req: { user } }) => Boolean(user),
    // Bookings are written server-side by /api/booking through the Local API
    // (which bypasses access control), so the public endpoint needs no create
    // access of its own.
    create: () => false,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.Role === 'admin',
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
