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
    openGraph: {
      title: blogInnerPage?.meta?.ogTitle,
      description: blogInnerPage?.meta?.ogDescription,
      images: [
        {
          url:
            typeof blogInnerPage?.meta?.ogImage === 'object'
              ? `${process.env.NEXT_PUBLIC_SITE_DOMAIN}${blogInnerPage?.meta?.ogImage?.url}`
              : undefined,
          width: 1200,
          height: 630,
          alt: blogInnerPage?.meta?.ogTitle,
        },
      ],
      type: 'website',
    },
  }
}

function getBaseURL() {
  // 1. If we're in a Vercel Preview/Prod environment
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // 2. If you set a manual SITE_DOMAIN for production (optional)
  if (process.env.NEXT_PUBLIC_SITE_DOMAIN) {
    return process.env.NEXT_PUBLIC_SITE_DOMAIN
  }

  // 3. Local dev
  return 'http://localhost:3000'
}
console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
// fetching page data
async function getInnerPageData(slug: string) {
  try {
    const baseURL = getBaseURL()
    const response = await fetch(`${baseURL}/api/blogInner/?where[slug][equals]=${slug}&depth=2`)
    return await response.json()
  } catch (err) {
    console.error(err)
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
