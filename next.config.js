const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap() {
      return {
        "/blogs/create": { page: '/blogs/create' },
        "/blogs/edit": { page: '/blogs/edit' },
      }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'empty.t-n.top',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bing.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cn.bing.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'p.t-n.top',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wsrv.nl',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

module.exports = nextConfig
