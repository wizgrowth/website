import { Hero, Services, FreeConsultation } from './components'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const servicesPageMetaData = await payload.findGlobal({
  slug: 'services',
})

export function generateMetadata() {
  return {
    title: servicesPageMetaData?.meta?.title || 'Wizgrowth Services Page',
    description: servicesPageMetaData?.meta?.description || 'Wizgrowth Services Page',
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
