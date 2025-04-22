import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: ({ req: { user } }) => {
      return user?.Role === 'admin' && true
    },
    read: ({ req: { user } }) => {
      if (user?.Role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    update: ({ req: { user } }) => {
      if (user?.Role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      return user?.Role === 'admin' && true
    },
  },
  fields: [
    { name: 'Name', type: 'text', required: true, defaultValue: 'User' },
    {
      name: 'Role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        create: ({ req: { user } }) => {
          return user?.Role === 'admin' && true
        },
        read: ({ req: { user } }) => {
          return user?.Role === 'admin' && true
        },
        update: ({ req: { user } }) => {
          return user?.Role === 'admin' && true
        },
      },
    },
  ],
}
