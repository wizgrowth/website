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

export default async function BlogInnerPage({ params }: ParamsProps) {
  const { slug } = await params
  return <section className="mt-40">{slug}</section>
}
