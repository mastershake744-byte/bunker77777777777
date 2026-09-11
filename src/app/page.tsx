import type { Metadata } from 'next';
import Script from 'next/script';
import HomePage from '@/components/Home';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/data/seo';

const ogImage = `${SITE_URL}/images/og-default.jpg`;

export const metadata: Metadata = {
  title: 'Котёл с бункером купить — пеллетные, твердотопливные, автоматические | Теплоэнергетика',
  description: 'Котлы с бункером длительного горения на пеллетах. Котел пеллетный автоматический с бункером цена. Котлы с низким бункером и верхним из Красноярска.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — твёрдотопливные и пеллетные котлы`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
};

export default function Page() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <HomePage />
    </>
  );
}