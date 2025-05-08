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
      return (user?.Role === 'admin' || user?.Role === 'user') && true
      // if (user?.Role === 'admin') return true
      // return {
      //   id: {
      //     equals: user?.id,
      //   },
      // }
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
      name: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
    },
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
    {
      name: 'Designation',
      type: 'text',
    },
    { name: 'Description', type: 'textarea' },
    {
      name: 'Social Media',
      type: 'group',
      fields: [
        { name: 'LinkedIn', type: 'text' },
        { name: 'Twitter', type: 'text' },
        { name: 'Instagram', type: 'text' },
      ],
    },
  ],
}
