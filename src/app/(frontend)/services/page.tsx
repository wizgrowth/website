import { Hero, Services, FreeConsultation } from './components'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const servicesPageMetaData = await payload.findGlobal({
  slug: 'services',
})
console.log(servicesPageMetaData)
export function generateMetadata() {
  return {
    title: servicesPageMetaData?.meta?.title || 'Services Page',
    description: servicesPageMetaData?.meta?.description || 'Wizgrowth Services Page',
    openGraph: {
      title: servicesPageMetaData?.meta?.ogTitle,
      description: servicesPageMetaData?.meta?.ogDescription,
      images: [
        {
          url:
            typeof servicesPageMetaData?.meta?.ogImage === 'object'
              ? `${process.env.NEXT_PUBLIC_SITE_DOMAIN}${servicesPageMetaData?.meta?.ogImage?.url}`
              : undefined,
          width: 1200,
          height: 630,
          alt: servicesPageMetaData?.meta?.ogTitle,
        },
      ],
      type: 'website',
    },
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
