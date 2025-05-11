import { Hero } from './components'

type BlogInnerPageProps = {
  slug: string
}

type ParamsProps = {
  params: Promise<BlogInnerPageProps>
}

type MetaData = {
  docs: {
    meta: {
      title?: string
      description?: string
    }
  }[]
}

// fetching meta data
const fetchMetaData = async (slug: string): Promise<MetaData> => {
  try {
    const response = await fetch(
      `${process.env.SITE_DOMAIN}/api/blogInner/?select[slug]=true&select[meta]=true&where[slug][equals]=${slug}`,
    )
    const data: MetaData = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching data:', err)
    throw new Error('Failed to fetch metadata')
  }
}
export async function generateMetadata({ params }: ParamsProps) {
  const { slug } = await params
  const meta = await fetchMetaData(slug)
  return {
    title: meta?.docs?.[0]?.meta?.title || 'Wizgrowth Blogs',
    description: meta?.docs?.[0]?.meta?.description,
  }
}

// fetching page data
export async function getPageData(slug: string) {
  try {
    const response = await fetch(
      `${process.env.SITE_DOMAIN}/api/blogInner/?where[slug][equals]=${slug}&depth=2`,
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
  const innerData = await getPageData(slug)

  return (
    <>
      <Hero innerData={innerData.docs[0]} />
    </>
  )
}
