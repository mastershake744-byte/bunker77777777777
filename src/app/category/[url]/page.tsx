import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { boilersData } from '@/data/products';
import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SITE_URL, SITE_NAME } from '@/data/seo';

export function generateStaticParams() {
  return categories.map((c) => ({ url: c.url.replace(/\/$/, '') }));
}

export function generateMetadata({ params }: { params: { url: string } }): Metadata {
  const category = categories.find(
    (c) => c.url.replace(/\/$/, '') === params.url.replace(/\/$/, '')
  );
  if (!category) return {};
  return {
    title: category.seo_title,
    description: category.seo_description,
    alternates: { canonical: `${SITE_URL}/category/${params.url}/` },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: SITE_NAME,
      title: category.seo_title,
      description: category.seo_description,
      url: `${SITE_URL}/category/${params.url}/`,
      images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default function CategoryPage({ params }: { params: { url: string } }) {
  const category = categories.find(
    (c) => c.url.replace(/\/$/, '') === params.url.replace(/\/$/, '')
  );
  if (!category) notFound();

  const products = category.products
    .map((id) => boilersData.find((b) => b.id === id))
    .filter((b): b is typeof boilersData[number] => Boolean(b));

  const breadParts = category.bread.split(' / ');

  const getBadge = (b: typeof boilersData[number]) => {
    const p = parseInt(b.characteristics.power) || 0;
    if (p >= 500) return { text: 'ПРЕМИУМ', cls: 'premium' };
    if (p >= 200) return { text: 'ХИТ', cls: 'hit' };
    if (b.availability === 'в наличии') return { text: 'В НАЛИЧИИ', cls: 'hit' };
    return null;
  };

  const parsePower = (s: string) => parseInt(s) || 0;
  const parseBunker = (s: string) => parseInt(s) || 0;

  const catSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    url: `${SITE_URL}/category/${params.url}/`,
    inLanguage: 'ru',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Магазин', item: `${SITE_URL}/shop/` },
        { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_URL}/category/${params.url}/` },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/product/${p.url}`,
      })),
    },
  };

  return (
    <>
      <Script id="category-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catSchema) }} />
      <style>{`
:root{
--bg:#050807;
--card:#090d0b;
--text:#fff;
--muted:#9b9f9c;
--accent:#22e968;
}
body.light-mode{
--bg:#f3eadf;
--card:#fff8ef;
--text:#29231d;
--muted:#786d61;
--accent:#b87935;
}
*{box-sizing:border-box;margin:0;padding:0}
body{
font-family:Arial,sans-serif;
background:var(--bg);
color:var(--text);
transition:.3s;
}
.container{
max-width:1200px;
margin:0 auto;
padding:0 20px;
}
.breadcrumbs{
padding:20px 0;
color:var(--muted);
display:flex;align-items:center;gap:6px;flex-wrap:wrap;
}
.breadcrumbs a{color:var(--muted);text-decoration:none}
.breadcrumbs a:hover{color:var(--accent)}
.breadcrumbs svg{width:16px;height:16px}
.breadcrumbs .current{color:var(--text)}
.catalog-header{
display:flex;justify-content:space-between;align-items:flex-start;gap:40px;
margin-bottom:30px;
}
.catalog-header-left{flex:1}
.catalog-badge{
display:inline-block;padding:5px 14px;border-radius:20px;font-size:13px;
background:var(--accent);color:#000;font-weight:600;margin-bottom:14px;
}
.catalog-title{font-size:36px;font-weight:800;line-height:1.1;margin-bottom:12px}
.catalog-title span{color:var(--accent)}
.catalog-desc{color:var(--muted);line-height:1.6;max-width:500px;margin-bottom:14px}
.catalog-meta{display:flex;gap:20px;font-size:14px;color:var(--muted)}
.catalog-cta{text-align:right}
.catalog-cta a{
display:inline-flex;align-items:center;gap:10px;
background:var(--accent);color:#000;border:0;
padding:16px 28px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;
text-decoration:none;
}
.catalog-cta a svg{width:22px;height:22px}
.catalog-cta small{display:block;margin-top:8px;color:var(--muted);font-size:12px}
.grid{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:20px;
}
.product-card{
background:var(--card);
border-radius:14px;
border:1px solid #5553;
overflow:hidden;
display:flex;flex-direction:column;
transition:border-color .2s, transform .2s;
}
.product-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.product-card-image{
position:relative;
aspect-ratio:16/9;
background:var(--bg);
display:flex;align-items:center;justify-content:center;
padding:16px;
}
.product-card-image img{width:100%;height:100%;object-fit:contain}
.product-badge{
position:absolute;top:10px;left:10px;
padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;letter-spacing:.5px;
background:#555;color:#fff;
}
.product-badge.hit{background:var(--accent);color:#000}
.product-badge.premium{background:#f59e0b;color:#000}
.product-card-body{
padding:16px 18px;
flex:1;display:flex;flex-direction:column;
}
.product-model{
font-size:11px;text-transform:uppercase;letter-spacing:1.5px;
color:var(--muted);margin-bottom:4px;
}
.product-card-body h3{
font-size:15px;font-weight:700;margin-bottom:12px;
line-height:1.2;
}
.product-specs{
display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;
margin-bottom:14px;
}
.spec-item{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);line-height:1.5}
.spec-value{color:var(--text);font-weight:600}
.spec-value .unit{color:var(--muted);font-weight:400;font-size:11px}
.product-card-footer{border-top:1px solid #5553;padding:12px 18px;margin:0 -18px -16px;background:var(--bg)}
.product-price{display:flex;justify-content:space-between;align-items:baseline}
.product-price .amount{font-size:17px;font-weight:700;color:var(--accent)}
.product-price .note{font-size:11px;color:var(--muted)}
.pagination{
display:flex;justify-content:center;align-items:center;gap:8px;
margin-top:40px;
}
.pagination a,.pagination button{
display:inline-flex;align-items:center;justify-content:center;
min-width:38px;height:38px;border-radius:8px;
background:var(--card);color:var(--text);text-decoration:none;
font-size:14px;border:1px solid #5553;cursor:pointer;
}
.pagination a.active,.pagination button.active{
background:var(--accent);color:#000;font-weight:700;border-color:var(--accent);
}
.pagination a.arrow{font-size:22px;font-weight:400}
.pagination .dots{color:var(--muted);letter-spacing:2px}

@media(max-width:1100px){.grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:800px){
.catalog-header{flex-direction:column}
.catalog-cta{text-align:left}
.catalog-title{font-size:26px}
.grid{grid-template-columns:1fr 1fr}
}
@media(max-width:500px){.grid{grid-template-columns:1fr}}
      `}</style>

      <section className="catalog-section">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Главная</a>
            {breadParts.slice(1).map((part, i) => {
              const isLast = i === breadParts.slice(1).length - 1;
              return (
                <span key={i} style={{display:'inline-flex',alignItems:'center',gap:6}}>
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                  {isLast ? <span className="current">{part}</span> : <a href="/catalog">Каталог</a>}
                </span>
              );
            })}
          </nav>

          <div className="catalog-header">
            <div className="catalog-header-left">
              <div className="catalog-badge">Категория</div>
              <h1 className="catalog-title">
                {category.name.split(' ').slice(0, -1).join(' ')}
                <span> {category.name.split(' ').slice(-1)}</span>
              </h1>
              <p className="catalog-desc">{category.text}</p>
              <div className="catalog-meta">
                <span>✅ Работаем с НДС</span>
                <span>💳 Оплата по счёту</span>
              </div>
            </div>
            <div className="catalog-cta">
              <a href={`mailto:kotli@teplo-en.ru?subject=${encodeURIComponent('Запрос КП с сайта: ' + category.name)}`} className="catalog-cta-btn">
                ЗАПРОСИТЬ КП
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </a>
              <small>Для юр. лиц и ИП</small>
            </div>
          </div>

          <div className="grid">
            {products.map((p) => {
              const badge = getBadge(p);
              return (
                <Link key={p.id} href={`/product/${p.url.replace(/\/$/, '')}/`} className="product-card" style={{textDecoration:'none',color:'inherit'}}>
                  <div className="product-card-image">
                    <img src={p.photo} alt={p.name} loading="lazy" />
                    {badge && <span className={'product-badge ' + badge.cls}>{badge.text}</span>}
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

          {products.length > 8 && (
            <nav className="pagination" aria-label="Навигация по страницам">
              <a href="#" className="arrow" aria-label="Предыдущая страница">‹</a>
              <a href="#" className="active">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <span className="dots">…</span>
              <a href="#" className="arrow" aria-label="Следующая страница">›</a>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}