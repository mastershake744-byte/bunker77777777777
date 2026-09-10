import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getTagByUrl, getProductsByTag, allTags, normalizePower } from '@/components/Tags/tags';
import { SITE_URL, SITE_NAME } from '@/data/seo';

export function generateStaticParams() {
  return allTags.map((t) => ({ url: t.url }));
}

function parsePrice(p: string): number {
  const n = parseInt(p.replace(/[^\d]/g, ''));
  return isNaN(n) ? 0 : n;
}

function tagRazdels(tagUrl: string): string[] {
  const tag = getTagByUrl(tagUrl);
  if (!tag) return [];
  return Array.from(new Set(getProductsByTag(tag).map((p) => p.razdel)));
}

function makeTitle(tag: ReturnType<typeof getTagByUrl>, products: Awaited<ReturnType<typeof getProductsByTag>>): string {
  if (!tag) return '';
  const razdels = Array.from(new Set(products.map((p) => p.razdel)));
  const head = razdels.length === 1 ? razdels[0] : 'Котлы';
  return `${head} мощностью ${tag.power} кВт — купить | Теплоэнергетика`;
}

function makeDescription(tag: ReturnType<typeof getTagByUrl>, products: Awaited<ReturnType<typeof getProductsByTag>>): string {
  if (!tag) return '';
  const prices = products.map((p) => parsePrice(p.price)).filter((v) => v > 0);
  const from = prices.length ? ` Цены от ${Math.min(...prices).toLocaleString('ru-RU')} ₽.` : '';
  return `Котлы с бункером мощностью ${tag.power} кВт с автоматической подачей топлива: ${products.length} моделей в каталоге.${from} Доставка по России.`;
}

export function generateMetadata({ params }: { params: { url: string } }): Metadata {
  const tag = getTagByUrl(params.url);
  if (!tag) return {};
  const products = getProductsByTag(tag);
  const canonical = `${SITE_URL}/tag/${tag.url}/`;
  return {
    title: makeTitle(tag, products),
    description: makeDescription(tag, products),
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: SITE_NAME,
      title: makeTitle(tag, products),
      description: makeDescription(tag, products),
      url: canonical,
      images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: makeTitle(tag, products),
      description: makeDescription(tag, products),
      images: [`${SITE_URL}/images/og-default.jpg`],
    },
  };
}

export default function TagPage({ params }: { params: { url: string } }) {
  const tag = getTagByUrl(params.url);
  if (!tag) notFound();

  const products = getProductsByTag(tag);
  const razdels = Array.from(new Set(products.map((p) => p.razdel)));
  const prices = products.map((p) => parsePrice(p.price)).filter((v) => v > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const breadSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Магазин', item: `${SITE_URL}/shop/` },
      { '@type': 'ListItem', position: 3, name: `Котлы мощностью ${tag.power} кВт`, item: `${SITE_URL}/tag/${tag.url}/` },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: makeTitle(tag, products),
    description: makeDescription(tag, products),
    url: `${SITE_URL}/tag/${params.url}/`,
    inLanguage: 'ru',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          image: p.photo.startsWith('http') ? p.photo : `${SITE_URL}${p.photo}`,
          description: `Котел мощностью ${p.characteristics.power}, бункер ${p.characteristics.bunkerVolume}, вес ${p.characteristics.weight}.`,
          sku: `VULKAN-${p.id}`,
          brand: { '@type': 'Brand', name: 'ТеплоЭнергетика' },
          offers: {
            '@type': 'Offer',
            price: p.price.replace(/[^\d]/g, ''),
            priceCurrency: 'RUB',
            availability: p.availability === 'в наличии' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
            url: `${SITE_URL}/product/${p.url}`,
          },
        },
      })),
    },
  };

  const aggregateSchema = prices.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: makeTitle(tag, products),
        description: makeDescription(tag, products),
        url: `${SITE_URL}/tag/${params.url}/`,
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: minPrice,
          highPrice: maxPrice,
          priceCurrency: 'RUB',
          offerCount: products.length,
          availability: 'https://schema.org/InStock',
        },
      }
    : null;

  return (
    <>
      <Script id="tag-breadcrumbs-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadSchema) }} />
      <Script id="tag-collection-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      {aggregateSchema && <Script id="tag-aggregate-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }} />}
      <style>{`
:root{--bg:#050807;--card:#090d0b;--text:#fff;--muted:#9b9f9c;--accent:#22e968;}
body.light-mode{--bg:#f3eadf;--card:#fff8ef;--text:#29231d;--muted:#786d61;--accent:#b87935;}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:var(--bg);color:var(--text);transition:.3s;}
.container{max-width:1200px;margin:0 auto;padding:0 20px;}
.breadcrumbs{padding:20px 0;color:var(--muted);display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.breadcrumbs a{color:var(--muted);text-decoration:none}
.breadcrumbs a:hover{color:var(--accent)}
.breadcrumbs svg{width:16px;height:16px}
.breadcrumbs .current{color:var(--text)}
.catalog-header{display:flex;justify-content:space-between;align-items:flex-start;gap:40px;margin-bottom:30px;}
.catalog-header-left{flex:1}
.catalog-badge{display:inline-block;padding:5px 14px;border-radius:20px;font-size:13px;background:var(--accent);color:#000;font-weight:600;margin-bottom:14px;}
.catalog-title{font-size:36px;font-weight:800;line-height:1.1;margin-bottom:12px}
.catalog-title span{color:var(--accent)}
.catalog-desc{color:var(--muted);line-height:1.6;max-width:520px;margin-bottom:14px}
.catalog-meta{display:flex;gap:20px;font-size:14px;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.product-card{background:var(--card);border-radius:14px;border:1px solid #5553;overflow:hidden;display:flex;flex-direction:column;transition:border-color .2s,transform .2s;text-decoration:none;color:inherit;}
.product-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.product-card-image{position:relative;aspect-ratio:16/9;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:16px;}
.product-card-image img{width:100%;height:100%;object-fit:contain}
.product-card-body{padding:16px 18px;flex:1;display:flex;flex-direction:column;}
.product-model{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:4px;}
.product-card-body h3{font-size:15px;font-weight:700;margin-bottom:12px;line-height:1.2;}
.product-specs{display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;margin-bottom:14px;}
.spec-item{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);line-height:1.5}
.spec-value{color:var(--text);font-weight:600}
.spec-value .unit{color:var(--muted);font-weight:400;font-size:11px}
.product-card-footer{border-top:1px solid #5553;padding:12px 18px;margin:0 -18px -16px;background:var(--bg)}
.product-price{display:flex;justify-content:space-between;align-items:baseline}
.product-price .amount{font-size:17px;font-weight:700;color:var(--accent)}
.product-price .note{font-size:11px;color:var(--muted)}
@media(max-width:1100px){.grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:800px){.catalog-header{flex-direction:column}.catalog-title{font-size:26px}.grid{grid-template-columns:1fr 1fr}}
@media(max-width:500px){.grid{grid-template-columns:1fr}}
      `}</style>

      <section className="catalog-section">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Главная</a>
            <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
              <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
              <a href="/catalog">Каталог</a>
            </span>
            <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
              <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
              <span className="current">{razdels.join(', ')} мощностью {tag.power} кВт</span>
            </span>
          </nav>

          <div className="catalog-header">
            <div className="catalog-header-left">
              <div className="catalog-badge">Метка</div>
              <h1 className="catalog-title">
                {razdels.length === 1 ? razdels[0] : 'Котлы'}
                <span> мощностью {tag.power} кВт</span>
              </h1>
              <p className="catalog-desc">
                {razdels.join(', ')} мощностью {tag.power} кВт с автоматической подачей топлива и бункером — {products.length} моделей в наличии и под заказ.
              </p>
              <div className="catalog-meta">
                <span>{products.length} моделей</span>
                {minPrice > 0 && <span>Цены от {minPrice.toLocaleString('ru-RU')} ₽</span>}
                <span>✅ Работаем с НДС</span>
              </div>
            </div>
          </div>

          <div className="grid">
            {products.map((p) => {
              const parsePower = (s: string) => parseInt(s) || 0;
              const parseBunker = (s: string) => parseInt(s) || 0;
              return (
                <Link key={p.id} href={`/product/${p.url.replace(/\/$/, '')}/`} className="product-card">
                  <div className="product-card-image">
                    <img src={p.photo} alt={p.name} loading="lazy" />
                  </div>
                  <div className="product-card-body">
                    <div className="product-model">{p.razdel}</div>
                    <h3>{p.name.replace('Автоматический ', '').replace('Полуавтоматический ', '').replace('твердотопливный котел ', '').replace('пеллетный котел ', '')}</h3>
                    <div className="product-specs">
                      <div className="spec-item">
                        <span>Мощность</span>
                        <span className="spec-value">{parsePower(p.characteristics.power)} <span className="unit">кВт</span></span>
                      </div>
                      <div className="spec-item">
                        <span>Бункер</span>
                        <span className="spec-value">{parseBunker(p.characteristics.bunkerVolume)} <span className="unit">л</span></span>
                      </div>
                      <div className="spec-item">
                        <span>Наличие</span>
                        <span className="spec-value">{p.availability === 'в наличии' ? 'В наличии' : 'Под заказ'}</span>
                      </div>
                    </div>
                    <div className="product-card-footer">
                      <div className="product-price">
                        <span className="amount">{p.price}</span>
                        <span className="note">с НДС</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}