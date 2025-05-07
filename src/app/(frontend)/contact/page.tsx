import MeetingScheduler from '../components/sections/meeting-scheduler'
import { Hero, OurBackground } from './components'

type MetaData = {
  meta: {
    title?: string
    description?: string
  }
}

const fetchMetaData = async (): Promise<MetaData> => {
  try {
    const response = await fetch(`${process.env.SITE_DOMAIN}/api/globals/contact`)
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

export default function Contact() {
  return (
    <>
      <Hero />
      <div className="mt-20">
        <MeetingScheduler />
      </div>
      <OurBackground />
    </>
  )
}
