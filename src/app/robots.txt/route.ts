import { SITE_URL } from '@/data/seo';

export async function GET() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}

Host: ${SITE_URL}

# Main pages
Allow: /

# Disallow admin and API
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Crawl-delay for bots
Crawl-delay: 1`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}