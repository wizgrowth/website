import { getPayload } from 'payload'
import config from '@payload-config'
import { Hero, BlogList } from './components'

const payload = await getPayload({ config })

const blogHomeData = await payload.findGlobal({
  slug: 'blog-home',
})

const blogHeroData = await payload.find({
  collection: 'blogInner',
  depth: 2,
  limit: 1, // limit to 1 item
  sort: '-createdAt', // sort by most recent
  select: {
    title: true,
    slug: true,
    category: true,
    readingTime: true,
    publishedBy: true,
    featuredImage: true,
  },
})

export function generateMetadata() {
  return {
    title: blogHomeData?.meta?.title || 'Wizgrowth Blog',
    description: blogHomeData?.meta?.description || 'Welcome to wizgrowth blog',
  }
}

export default function BlogHome() {
  return (
    <section className="mt-40">
      <Hero innerData={blogHeroData.docs[0]} />
      <BlogList />
    </section>
  )
}
