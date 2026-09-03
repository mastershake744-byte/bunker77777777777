import { NextRequest } from 'next/server';

export async function GET() {
  const sitemapUrl = process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`
    : 'https://teplo-en.ru/sitemap.xml';

  const robots = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}

Host: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://teplo-en.ru'}

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