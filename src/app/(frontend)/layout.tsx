import React from 'react'
import './styles.css'
import { Header } from '@components/header'
import { Footer } from '@/components/footer'
// In your app/layout.js (App Router) or pages/_app.js (Pages Router)
import { Poppins } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import { NoScript } from './script'

// Configure the font with all variants you need
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  // This makes the font variable accessible
  variable: '--font-poppins',
})

export const metadata = {
  title: {
    default: 'Wizgrowth - India’s Leading Digital Marketing Agency',
    template: '%s - Wizgrowth',
  },
  description:
    'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
  openGraph: {
    title: 'Wizgrowth - India’s Leading Digital Marketing Agency',
    description:
      'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
    type: 'website',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={poppins.variable}>
      <GoogleTagManager gtmId="GTM-5VR52CQZ" />
      <body>
        <NoScript />
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
