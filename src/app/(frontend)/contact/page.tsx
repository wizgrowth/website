import MeetingScheduler from '../components/sections/meeting-scheduler'
import { Hero, OurBackground } from './components'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const contactMetaData = await payload.findGlobal({
  slug: 'contact',
})

export function generateMetadata() {
  return {
    title: contactMetaData?.meta?.title || 'Wizgrowth Contact us Page',
    description:
      contactMetaData?.meta?.description || 'Get in touch with us for any inquiries or support.',
    openGraph: {
      title: contactMetaData?.meta?.ogTitle,
      description: contactMetaData?.meta?.ogDescription,
      images: [
        {
          url:
            typeof contactMetaData?.meta?.ogImage === 'object'
              ? `${process.env.NEXT_PUBLIC_SITE_DOMAIN}${contactMetaData?.meta?.ogImage?.url}`
              : undefined,
          width: 1200,
          height: 630,
          alt: contactMetaData?.meta?.ogTitle,
        },
      ],
      type: 'website',
    },
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
