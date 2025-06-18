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
    title: homePageData?.meta?.title || 'Wizgrowth - India’s Leading Digital Marketing Agency',
    description:
      homePageData?.meta?.description ||
      'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
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
