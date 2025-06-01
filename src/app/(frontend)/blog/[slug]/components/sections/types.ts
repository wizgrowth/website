export type BlogPost = {
  id: number
  slug: string
  title: string
  featuredImage: {
    id: number
    alt: string
    url: string
  }
  publishedBy: {
    name?: string
    profilePicture?: {
      alt?: string
      url?: string
    }
  }
  category: string[]
  readingTime: string
  sideMenu: {
    id: string
    titleId: string
    title: string
  }[]
  content?: any // type this more strictly later if needed
  meta: {
    title: string
    description: string
    image?: string
  }
  updatedAt: string
  createdAt: string
}
