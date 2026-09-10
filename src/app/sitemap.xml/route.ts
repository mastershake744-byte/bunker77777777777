import { NextRequest } from 'next/server';
import { boilersData } from '../../data/products';
import { categories } from '../../data/categories';
import { articles } from '../../data/articles';

// Helper to extract slugs from products.ts
function getProductSlugs(): string[] {
  return boilersData
    .filter(p => p.razdel && p.razdel !== 'Главная' && p.razdel !== 'Каталог')
    .map(p => {
      if (p.url) return p.url.replace(/\/$/, '');
      return p.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');
    })
    .filter(Boolean)
    .map(s => s + '/');
}

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://teplo-en.ru';
  const slugs = getProductSlugs();

  const urls = slugs.map(slug => `${baseUrl}/product/${slug}`);

  const categorySlugs = categories
    .map(c => c.url.replace(/\/$/, ''))
    .filter(Boolean)
    .map(s => `${baseUrl}/category/${s}/`);

  const articleSlugs = articles
    .map(a => a.url.replace(/\/$/, ''))
    .filter(Boolean)
    .map(s => `${baseUrl}/blog/${s}/`);

  urls.push(...categorySlugs, ...articleSlugs);

  // Add other important pages
  urls.push(
    baseUrl,
    `${baseUrl}/katalog`,
    `${baseUrl}/kontakty`,
    `${baseUrl}/o-nas`,
    `${baseUrl}/dostavka-i-oplata`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls
    .map(
      url => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}