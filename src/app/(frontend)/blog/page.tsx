import { getPayload } from 'payload'
import config from '@payload-config'
import { Hero } from './components'

const payload = await getPayload({ config })

const blogHomeData = await payload.findGlobal({
  slug: 'blog-home',
})

const blogInnerData = await payload.find({
  collection: 'blogInner',
  depth: 2,
  select: {
    title: true,
    slug: true,
    category: true,
    readingTime: true,
    publishedBy: true,
    featuredImage: true,
  },
})

console.dir(blogInnerData.docs[1], { depth: 5, colors: true })

export function generateMetadata() {
  return {
    title: blogHomeData?.meta?.title || 'Blog Home',
    description: blogHomeData?.meta?.description || 'Welcome to the blog',
  }
}

export default function BlogHome() {
  return (
    <section className="mt-40">
      <Hero innerData={blogInnerData.docs[1]} />
    </section>
  )
}
