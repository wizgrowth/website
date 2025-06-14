import { Hero, Content } from './components'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

type ParamsProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ParamsProps) {
  const { slug } = await params

  const result = await payload.find({
    collection: 'blogInner',
    where: {
      slug: { equals: slug },
    },
  })

  const blogInnerPage = result.docs?.[0]

  return {
    title: blogInnerPage?.meta?.title || 'Wizgrowth Blogs',
    description: blogInnerPage?.meta?.description || 'Stay updated with the latest from Wizgrowth.',
  }
}

// fetching page data
async function getInnerPageData(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/blogInner/?where[slug][equals]=${slug}&depth=2`,
    )
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch page data')
  }
}

export default async function BlogInnerPage({ params }: ParamsProps) {
  const { slug } = await params
  const innerData = await getInnerPageData(slug)

  return (
    <>
      <Hero innerData={innerData.docs[0]} />
      <Content innerData={innerData.docs[0]} />
    </>
  )
}
