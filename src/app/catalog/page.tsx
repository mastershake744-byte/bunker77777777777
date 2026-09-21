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
  alternates: { canonical: `${SITE_URL}/catalog/` },
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
    url: `${SITE_URL}/catalog/`,
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
      <section className="catalog-section">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Главная</a>
            <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            <span className="current">Каталог котлов</span>
          </nav>
          <div className="catalog-header">
            <div className="catalog-header-left">
              <div className="catalog-badge">Для дома и бизнеса</div>
              <h1 className="catalog-title">
                Твёрдотопливные котлы
                <span> VULKAN</span>
              </h1>
              <p className="catalog-desc">
                Автоматические и полуавтоматические котлы на пеллетах, угле и дровах. От 11 до 1200 кВт.
              </p>
              <div className="catalog-meta">
                <span>✅ Работаем с НДС</span>
                <span>💳 Оплата по счёту</span>
              </div>
            </div>
            <div className="catalog-cta">
              <a href={`mailto:kotli@teplo-en.ru?subject=${encodeURIComponent('Запрос КП с сайта')}`} className="catalog-cta-btn">
                ЗАПРОСИТЬ КП
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </a>
              <small>Для юр. лиц и ИП</small>
            </div>
          </div>
        </div>
        <Suspense fallback={<div className="container" style={{padding:40,textAlign:'center',color:'var(--muted)'}}>Загрузка товаров...</div>}>
          <CatalogPageContent />
        </Suspense>
      </section>
    </>
  );
}