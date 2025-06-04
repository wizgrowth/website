export type BlogPost = {
  id: number
  slug: string
  title?: string | null | undefined
  category?: ('general' | 'best of' | 'ai')[] | null | undefined
  readingTime?: string | null | undefined
  publishedBy?:
    | {
        name?: string | null | undefined
      }
    | number
    | null
    | undefined
  featuredImage?:
    | {
        url?: string | null | undefined
        alt?: string | null | undefined
      }
    | number
    | null
    | undefined
}
