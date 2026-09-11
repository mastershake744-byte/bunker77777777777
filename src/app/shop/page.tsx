import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { boilersData } from '@/data/products';
import { SITE_URL } from '@/data/seo';

const ogImage = `${SITE_URL}/images/og-default.jpg`;

export const metadata: Metadata = {
  title: 'Магазин котлов',
  description: 'Все котлы Теплоэнергетика: пеллетные, твердотопливные, полуавтоматические. Категории, модели, цены. Доставка по всей России.',
  alternates: { canonical: `${SITE_URL}/shop/` },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Теплоэнергетика',
    title: 'Магазин котлов',
    description: 'Все котлы Теплоэнергетика: пеллетные, твердотопливные, полуавтоматические.',
    url: `${SITE_URL}/shop/`,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
};

const getBadge = (b: typeof boilersData[number]) => {
  const p = parseInt(b.characteristics.power) || 0;
  if (p >= 500) return { text: 'ПРЕМИУМ', cls: 'premium' };
  if (p >= 200) return { text: 'ХИТ', cls: 'hit' };
  if (b.availability === 'в наличии') return { text: 'В НАЛИЧИИ', cls: 'hit' };
  return null;
};

const parsePower = (s: string) => parseInt(s) || 0;
const parseBunker = (s: string) => parseInt(s) || 0;

export default function ShopPage() {
  const shopSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Магазин котлов | Теплоэнергетика',
    url: `${SITE_URL}/shop/`,
    inLanguage: 'ru',
    isPartOf: { '@type': 'WebSite', name: 'Теплоэнергетика', url: SITE_URL },
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
      <Script id="shop-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shopSchema) }} />
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
max-width:1400px;
margin:0 auto;
padding:0 24px;
}
.shop-hero{
padding:56px 0 40px;
border-bottom:1px solid #5553;
margin-bottom:44px;
}
.shop-badge{
display:inline-block;padding:6px 16px;border-radius:24px;font-size:14px;
background:var(--accent);color:#000;font-weight:700;letter-spacing:.5px;margin-bottom:18px;
}
.shop-title{
font-size:56px;font-weight:900;line-height:1.05;margin-bottom:16px;
}
.shop-title span{color:var(--accent)}
.shop-sub{
font-size:20px;color:var(--muted);line-height:1.5;max-width:640px;
}
.shop-meta{display:flex;gap:28px;margin-top:24px;font-size:16px;color:var(--muted);flex-wrap:wrap}
.shop-meta b{color:var(--text)}

.section-head{
margin:56px 0 28px;
}
.section-head h2{
font-size:40px;font-weight:900;margin-bottom:8px;
}
.section-head p{font-size:17px;color:var(--muted)}

.cat-grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:22px;
}
.cat-card{
background:var(--card);
border:1px solid #5553;
border-radius:18px;
padding:28px;
text-decoration:none;color:inherit;
display:flex;flex-direction:column;
transition:border-color .2s, transform .2s;
}
.cat-card:hover{border-color:var(--accent);transform:translateY(-3px)}
.cat-name{font-size:22px;font-weight:800;line-height:1.2;margin-bottom:10px}
.cat-count{font-size:14px;color:var(--muted);font-weight:600;margin-top:auto;padding-top:14px;border-top:1px solid #5553}
.cat-count span{color:var(--accent)}

.tag-strip{
display:flex;flex-wrap:wrap;gap:12px;margin-top:20px;
}
.tag-chip{
display:inline-flex;align-items:center;gap:6px;
padding:10px 20px;border-radius:30px;
background:var(--card);border:1px solid #5553;
font-size:16px;font-weight:700;color:var(--text);
text-decoration:none;transition:border-color .2s, background .2s;
}
.tag-chip:hover{border-color:var(--accent);background:rgba(34,233,104,.08)}
.tag-chip.premium{color:#f59e0b;border-color:#f59e0b55}
.tag-chip.hit{color:var(--accent);border-color:var(--accent)55}

.grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:22px;
}
.product-card{
background:var(--card);
border-radius:18px;
border:1px solid #5553;
overflow:hidden;
display:flex;flex-direction:column;
text-decoration:none;color:inherit;
transition:border-color .2s, transform .2s;
}
.product-card:hover{border-color:var(--accent);transform:translateY(-3px)}
.product-card-image{
position:relative;
aspect-ratio:16/10;
background:var(--bg);
display:flex;align-items:center;justify-content:center;
padding:18px;
}
.product-card-image img{width:100%;height:100%;object-fit:contain}
.product-badge{
position:absolute;top:12px;left:12px;
padding:5px 14px;border-radius:8px;font-size:12px;font-weight:800;letter-spacing:.6px;
background:#555;color:#fff;
}
.product-badge.hit{background:var(--accent);color:#000}
.product-badge.premium{background:#f59e0b;color:#000}
.product-card-body{padding:18px 20px;flex:1;display:flex;flex-direction:column}
.product-model{
font-size:12px;text-transform:uppercase;letter-spacing:1.5px;
color:var(--muted);margin-bottom:6px;
}
.product-card-body h3{font-size:18px;font-weight:800;margin-bottom:14px;line-height:1.2}
.product-specs{
display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;margin-bottom:16px;
}
.spec-item{display:flex;justify-content:space-between;font-size:14px;color:var(--muted);line-height:1.5}
.spec-value{color:var(--text);font-weight:700}
.spec-value .unit{color:var(--muted);font-weight:400;font-size:12px}
.product-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.mini-tag{
font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;
background:#5552;border:1px solid #5555;color:var(--muted);letter-spacing:.3px;
}
.mini-tag.on{color:var(--accent);border-color:var(--accent)55;background:rgba(34,233,104,.08)}
.product-card-footer{border-top:1px solid #5553;padding:14px 20px;background:var(--bg)}
.product-price{display:flex;justify-content:space-between;align-items:baseline}
.product-price .amount{font-size:19px;font-weight:800;color:var(--accent)}
.product-price .note{font-size:12px;color:var(--muted)}

@media(max-width:1100px){.cat-grid,.grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:800px){
.shop-title{font-size:40px}
.section-head h2{font-size:32px}
.cat-grid,.grid{grid-template-columns:1fr 1fr}
}
@media(max-width:500px){.cat-grid,.grid{grid-template-columns:1fr}}
      `}</style>

      <section className="shop-section">
        <div className="container">
          <div className="shop-hero">
            <div className="shop-badge">Магазин</div>
            <h1 className="shop-title">Все котлы <span>Теплоэнергетика</span></h1>
            <p className="shop-sub">
              Пеллетные, твердотопливные и полуавтоматические котлы — от 11 до 1200 кВт.
              Выберите категорию или переходите к моделям.
            </p>
            <div className="shop-meta">
              <span><b>{boilersData.length}</b> моделей</span>
              <span><b>{categories.length}</b> категорий</span>
              <span><b>8 982 324-95-25</b> — консультация</span>
            </div>
          </div>

          <div className="section-head">
            <h2>Категории</h2>
            <p>Выберите серию котлов</p>
          </div>
          <div className="cat-grid">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.url.replace(/\/$/, '')}/`} className="cat-card">
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count"><span>{cat.products.length}</span> моделей →</div>
              </Link>
            ))}
          </div>

          <div className="section-head">
            <h2>Метки</h2>
            <p>Популярные отметки на товарах</p>
          </div>
          <div className="tag-strip">
            <Link href="/shop/" className="tag-chip hit">ХИТ</Link>
            <Link href="/shop/" className="tag-chip premium">ПРЕМИУМ</Link>
            <Link href="/shop/" className="tag-chip">В НАЛИЧИИ</Link>
            <Link href="/shop/" className="tag-chip">ПОД ЗАКАЗ</Link>
            <Link href="/shop/" className="tag-chip">ПЕЛЛЕТНЫЕ</Link>
            <Link href="/shop/" className="tag-chip">ТВЕРДОТОПЛИВНЫЕ</Link>
          </div>

          <div className="section-head">
            <h2>Все товары</h2>
            <p>Полный каталог — нажмите на карточку для перехода к товару</p>
          </div>
          <div className="grid">
            {boilersData.map((b) => {
              const badge = getBadge(b);
              const modelTags: { label: string; on: boolean }[] = [
                { label: 'В НАЛИЧИИ', on: b.availability === 'в наличии' },
                { label: b.razdel === 'Пеллетные котлы' ? 'ПЕЛЛЕТНЫЕ' : b.razdel === 'Твердотопливные котлы' ? 'ТВЕРДОТОПЛИВНЫЕ' : 'ПОЛУАВТОМАТЫ', on: true },
                ...(b.tags ?? []).map((t) => ({ label: t, on: true })),
              ];
              return (
                <Link key={b.id} href={`/product/${b.url.replace(/\/$/, '')}/`} className="product-card">
                  <div className="product-card-image">
                    <img src={b.photo} alt={b.name} loading="lazy" />
                    {badge && <span className={'product-badge ' + badge.cls}>{badge.text}</span>}
                  </div>
                  <div className="product-card-body">
                    <div className="product-model">{b.razdel}</div>
                    <h3>{b.name}</h3>
                    <div className="product-specs">
                      <div className="spec-item">
                        <span>Мощность</span>
                        <span className="spec-value">{parsePower(b.characteristics.power)} <span className="unit">кВт</span></span>
                      </div>
                      <div className="spec-item">
                        <span>Бункер</span>
                        <span className="spec-value">{parseBunker(b.characteristics.bunkerVolume)} <span className="unit">л</span></span>
                      </div>
                    </div>
                    <div className="product-tags">
                      {modelTags.map((t, i) => (
                        <span key={i} className={'mini-tag' + (t.on ? ' on' : '')}>{t.label}</span>
                      ))}
                    </div>
                    <div className="product-card-footer">
                      <div className="product-price">
                        <span className="amount">{b.price}</span>
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