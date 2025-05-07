import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components')
    return config
  },
  images: {
    domains: ['vdskmkiggnujcnwluksm.supabase.co'],
  },
  trailingSlash: true,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
