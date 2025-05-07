import { Hero, Services, FreeConsultation } from './components'

type MetaData = {
  meta: {
    title?: string
    description?: string
  }
}

const fetchMetaData = async (): Promise<MetaData> => {
  try {
    const response = await fetch(`${process.env.SITE_DOMAIN}/api/globals/services`)
    const data: MetaData = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching data:', err)
    throw new Error('Failed to fetch metadata')
  }
}
export async function generateMetadata() {
  const meta = await fetchMetaData()
  return {
    title: meta?.meta?.title || 'Wizgrowth Contact us Page',
    description: meta?.meta?.description || 'Get in touch with us for any inquiries or support.',
  }
}

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <Services />
      <FreeConsultation />
    </>
  )
}
