import type { NextConfig } from 'next'

const config: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  serverExternalPackages: ['pdfkit'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/outils/simulateur-lmnp',
        destination: '/simulateurs/lmnp',
        permanent: true,
      },
    ]
  },
}

export default config
