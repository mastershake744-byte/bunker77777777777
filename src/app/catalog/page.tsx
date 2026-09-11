import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import { SITE_URL, SITE_NAME } from '@/data/seo';
import { boilersData } from '@/data/products';
import CatalogPageContent from './CatalogContent';

const ogImage = `${SITE_URL}/images/og-default.jpg`;

export const metadata: Metadata = {
  title: 'Каталог твёрдотопливных и пеллетных котлов',
  description: 'Автоматические и полуавтоматические котлы на пеллетах, угле и дровах. От 11 до 1200 кВт. Работаем с НДС.',
  alternates: { canonical: `${SITE_URL}/catalog` },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    title: 'Каталог твёрдотопливных и пеллетных котлов',
    description: 'Автоматические и полуавтоматические котлы на пеллетах, угле и дровах. От 11 до 1200 кВт.',
    url: `${SITE_URL}/catalog`,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
};

export default function CatalogPage() {
  const catSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Каталог твёрдотопливных и пеллетных котлов',
    url: `${SITE_URL}/catalog`,
    inLanguage: 'ru',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: boilersData.length,
      itemListElement: boilersData.slice(0, 100).map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        url: `${SITE_URL}/product/${b.url}`,
      })),
    },
  };

  return (
    <>
      <Script id="catalog-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catSchema) }} />
      <Suspense fallback={<div className="container" style={{padding:40,textAlign:'center',color:'var(--muted)'}}>Загрузка...</div>}>
        <CatalogPageContent />
      </Suspense>
    </>
  );
}