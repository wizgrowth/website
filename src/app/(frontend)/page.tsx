// import { headers as getHeaders } from 'next/headers.js'
// import { getPayload } from 'payload'
// import { fileURLToPath } from 'url'
// import config from '@/payload.config'
import React from 'react'
import './styles.css'
import { Hero } from './components/sections/hero'

type MetaData = {
  meta: {
    title?: string
    description?: string
  }
}

const fetchMetaData = async (): Promise<MetaData> => {
  try {
    const response = await fetch(`${process.env.SITE_DOMAIN}/api/globals/homepage`)
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
    title: meta?.meta?.title || 'Wizgrowth',
    description: meta?.meta?.description,
  }
}

export default async function HomePage() {
  // const headers = await getHeaders()
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })
  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <section className=" bg-primary-600 antialiased">
      <Hero />
    </section>
  )
}
