/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateIndexSitemap: false,
  generateRobotsTxt: true, // (optional)
  exclude: [
    '/blogs/create',
    '/blogs/edit',
    '/setting',
  ]
  // ...other options
}