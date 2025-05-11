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
      return true
      // return (user?.Role === 'admin' || user?.Role === 'user') && true
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
    { name: 'name', type: 'text', required: true, defaultValue: 'User' },
    {
      name: 'profilePicture',
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
      name: 'designation',
      type: 'text',
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        { name: 'linkedIn', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
  ],
}
