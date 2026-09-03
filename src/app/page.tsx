import type { Metadata } from 'next';
import Script from 'next/script';
import HomePage from '@/components/Home';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/data/seo';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — твёрдотопливные и пеллетные котлы`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
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
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/catalog?search_query={search_term_string}` },
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