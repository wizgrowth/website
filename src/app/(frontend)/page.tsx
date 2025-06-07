import React from 'react'
import './styles.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Hero } from './components/sections/hero'
import { Services } from './components/sections/services'
import MeetingScheduler from './components/sections/meeting-scheduler'

const payload = await getPayload({ config })

const homePageData = await payload.findGlobal({
  slug: 'homepage',
})

export function generateMetadata() {
  return {
    title: homePageData?.meta?.title || 'Wizgrowth Home Page',
    description: homePageData?.meta?.description || 'Wizgrowth Home Page',
  }
}

export default function HomePage() {
  return (
    <section className=" bg-primary-600 antialiased">
      <Hero />
      <Services />
      <MeetingScheduler />
    </section>
  )
}
