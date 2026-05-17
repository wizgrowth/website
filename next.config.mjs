import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibffbzwoucksfljolszp.supabase.co',
      },
    ],
    // Payload serves uploads at /api/media/... with query params (e.g. ?prefix=media).
    // Next.js 16 requires an explicit localPatterns entry when the src includes a search string.
    localPatterns: [
      {
        pathname: '/api/media/**',
      },
    ],
  },
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
