import type { CollectionConfig } from 'payload'

export const BlogInner: CollectionConfig = {
  slug: 'blogInner',
  fields: [
    {
      name: 'Title',
      type: 'text',
    },
    {
      name: 'publishedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create') {
          if (req.user) {
            data.publishedBy = req.user.id
          }
        }
        if (operation === 'update') {
          if (req.user) {
            data.updatedBy = req.user.id
          }
        }
        return data
      },
    ],
  },
}
