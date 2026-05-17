import type { GlobalConfig } from 'payload'

export const BlogHome: GlobalConfig = {
  slug: 'blog-home',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'title', // required
      type: 'text', // required
      required: true,
    },
  ],
}
