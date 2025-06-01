import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const BlogInner: CollectionConfig = {
  slug: 'blogInner',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Slug',
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      label: 'Title',
      name: 'title',
      type: 'text',
    },
    {
      label: 'Featured Image',
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      label: 'Category',
      name: 'category',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'General',
          value: 'general',
        },
        {
          label: 'Best Of',
          value: 'best of',
        },
        {
          label: 'AI',
          value: 'ai',
        },
      ],
    },
    {
      label: 'Reading Time',
      name: 'readingTime',
      type: 'text',
    },
    {
      label: 'Side Menu',
      name: 'sideMenu',
      type: 'array',
      interfaceName: 'SideMenu',
      fields: [
        {
          label: 'Title Id',
          name: 'titleId',
          type: 'text',
        },
        {
          label: 'Title',
          name: 'title',
          type: 'text',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
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
  // admin: {readonly:true} - This property makes the particular field readOnly to admins and users by payload
  // used hooks to add publishedby and updatedby data
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
