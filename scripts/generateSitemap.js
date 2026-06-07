import fs from 'fs'
import path from 'path'

// Assuming we run this from client root
const toolsFile = fs.readFileSync(path.join(process.cwd(), 'src/data/tools.ts'), 'utf8')

// Parse out slugs (naive approach for a quick script)
const categorySlugs = [...toolsFile.matchAll(/id:\s*'([^']+)',/g)].map(m => m[1]).filter(id => !id.includes('-')) // rough filter
const uniqueCategories = ['data', 'image', 'document', 'developer', 'business']

const toolSlugsMatches = [...toolsFile.matchAll(/slug:\s*'([^']+)'/g)]
const toolSlugs = toolSlugsMatches.map(m => m[1])

const baseUrl = 'https://convelta.com'
const date = new Date().toISOString().split('T')[0]

const urls = [
    '/',
    '/tools',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    ...uniqueCategories.map(c => `/category/${c}`),
    ...toolSlugs.map(t => `/tools/${t}`)
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${url === '/' || url === '/tools' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url === '/tools' ? '0.9' : url.includes('/tools/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`

fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap)
console.log('Sitemap generated successfully at public/sitemap.xml')
