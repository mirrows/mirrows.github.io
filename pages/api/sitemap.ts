export default function handler(req: any, res: any) {

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/xml')
      
      // Instructing the Vercel edge to cache the file
      res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
      
      // generate sitemap here
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
      <url>
        <loc>https://reedls.t-n.top/about</loc>
        <lastmod>2023-03-21</lastmod>
      </url>
      <url>
        <loc>https://reedls.t-n.top/blogs/4</loc>
        <lastmod>2023-03-21</lastmod>
      </url>
      <url>
        <loc>https://reedls.t-n.top/blogs/3</loc>
        <lastmod>2023-03-21</lastmod>
      </url>
      </urlset>`
  
    res.end(xml)
  }