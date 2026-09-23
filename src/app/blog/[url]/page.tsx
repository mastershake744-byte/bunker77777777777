import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SITE_URL, clampTitle } from '@/data/seo';

export function generateStaticParams() {
  return articles.map((a) => ({ url: a.url.replace(/\/$/, '') }));
}

export function generateMetadata({ params }: { params: { url: string } }): Metadata {
  const article = articles.find((a) => a.url.replace(/\/$/, '') === params.url.replace(/\/$/, ''));
  if (!article) return {};
  const title = clampTitle(article.seo_title);
  return {
    title,
    description: article.seo_description,
    alternates: { canonical: `${SITE_URL}/blog/${params.url}/` },
    openGraph: {
      title,
      description: article.seo_description,
      url: `${SITE_URL}/blog/${params.url}/`,
    },
  };
}

export default function BlogArticlePage({ params }: { params: { url: string } }) {
  const article = articles.find((a) => a.url.replace(/\/$/, '') === params.url.replace(/\/$/, ''));
  if (!article) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.seo_title || article.name,
    description: article.seo_description || '',
    image: article.photo.startsWith('http') ? article.photo : `${SITE_URL}${article.photo}`,
    datePublished: '2026-09-01',
    author: { '@type': 'Organization', name: 'Теплоэнергетика' },
    publisher: { '@type': 'Organization', name: 'Теплоэнергетика' },
    url: `${SITE_URL}/blog/${params.url}/`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${params.url}/` },
  };

  return (
    <>
      <style>{`
*{box-sizing:border-box;margin:0;padding:0}
.blog-article{
--bg:#050807;
--card:#0d1210;
--text:#f2fff0;
--muted:#bfd9ba;
--muted-2:#8fa88a;
--accent:#7fee64;
--border:#26302b;
--border-strong:#3e4a3c;
font-family:'Inter','Segoe UI',Arial,sans-serif;
background:var(--bg);
color:var(--text);
letter-spacing:-0.01em;
padding:0 24px 60px;
}
body.light-mode .blog-article{
--bg:#f6f2ea;
--card:#ffffff;
--text:#1c1a16;
--muted:#6b6a5f;
--muted-2:#8a8778;
--accent:#1e7e34;
--border:rgba(0,0,0,.09);
--border-strong:rgba(0,0,0,.16);
}
.blog-article a{color:inherit;text-decoration:none}
.ba-container{max-width:1075px;margin:0 auto}

.ba-crumbs{display:flex;align-items:center;gap:8px;padding:28px 0 0;color:var(--muted-2);font-size:13px;font-weight:500;flex-wrap:wrap}
.ba-crumbs a{color:var(--muted-2);transition:color .2s}
.ba-crumbs a:hover{color:var(--accent)}
.ba-crumbs svg{width:14px;height:14px;opacity:.5}
.ba-crumbs .cur{color:var(--text)}

.ba-header{padding:48px 0 36px;border-bottom:1px solid var(--border);margin-bottom:36px}
.ba-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px}
.ba-tag{
font-size:11px;font-weight:600;letter-spacing:.02em;
padding:4px 10px;border-radius:999px;
color:var(--accent);border:1px solid var(--border-strong);
background:rgba(127,238,100,.05);
}
body.light-mode .ba-tag{background:rgba(30,126,52,.05)}
.ba-header h1{
font-size:clamp(28px,4.5vw,44px);
font-weight:500;line-height:1.12;letter-spacing:-0.02em;
}

.article-html{font-size:16px;line-height:1.8;color:var(--text);word-break:break-word}
.article-html h2{font-size:26px;font-weight:500;line-height:1.25;margin:52px 0 18px;color:var(--text);letter-spacing:-0.02em}
.article-html h3{font-size:20px;font-weight:500;line-height:1.3;margin:36px 0 14px;color:var(--text)}
.article-html p{margin:0 0 22px;color:var(--muted)}
.article-html p strong,.article-html li strong{color:var(--text);font-weight:600}
.article-html ul,.article-html ol{margin:0 0 24px;padding-left:22px;color:var(--muted)}
.article-html li{margin-bottom:10px}
.article-html img{display:block;max-width:100%;height:auto;border-radius:12px;border:1px solid var(--border);margin:30px auto}
.article-html .ba-img{width:70%;object-fit:cover}
.article-html figure{width:70%;margin:30px auto}
.article-html figure img{width:100%;max-width:100%;margin:0}
.article-html figcaption{font-size:13px;color:var(--muted-2);text-align:center;margin-top:10px;line-height:1.5}
.article-html blockquote{border-left:3px solid var(--accent);background:var(--card);padding:18px 22px;border-radius:10px;margin:28px 0;font-style:italic;color:var(--text)}
.article-html table{width:100%;border-collapse:collapse;margin:28px 0;font-size:14px;line-height:1.6}
.article-html th{background:var(--card);color:var(--text);font-weight:600;padding:12px 14px;text-align:left;border-bottom:1px solid var(--border-strong)}
.article-html td{padding:12px 14px;border-bottom:1px solid var(--border);color:var(--muted);vertical-align:top}
.article-html tr:nth-child(even) td{background:rgba(127,238,100,.02)}
.article-html a{color:var(--accent);text-decoration:none;font-weight:600;border-bottom:1px solid var(--border-strong);transition:border-color .2s}
.article-html a:hover{border-color:var(--accent)}
.article-html .calc-box,.article-html .note-box{background:var(--card);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:10px;padding:20px 24px;margin:26px 0;font-size:15px;color:var(--muted)}
@media(max-width:640px){.blog-article{padding:0 16px 48px}.article-html table{font-size:13px}.article-html th,.article-html td{padding:10px}}
.bizon-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:800px){.bizon-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.bizon-grid{grid-template-columns:1fr}}
      `}</style>

      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="blog-article">
        <div className="ba-container">
          <nav className="ba-crumbs" aria-label="Breadcrumb">
            <a href="/">Главная</a>
            <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            <a href="/blog/">Статьи</a>
            <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            <span className="cur">{article.name}</span>
          </nav>

          <header className="ba-header">
            <div className="ba-tags">
              {article.tags.map((t) => (
                <span key={t} className="ba-tag">{t}</span>
              ))}
            </div>
            <h1>{article.name}</h1>
          </header>

          <article className="article-html" dangerouslySetInnerHTML={{ __html: article.text }} />

          <div style={{marginTop:48,padding:'28px 30px',borderRadius:12,background:'var(--card)',border:'1px solid var(--border)'}}>
            <div style={{fontSize:18,fontWeight:500,marginBottom:12,color:'var(--text)',letterSpacing:'-0.01em'}}>Нужна помощь с расчётом и подбором котельной?</div>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.7,marginBottom:18}}>Наши инженеры бесплатно помогут с тепловым расчётом, составлением технического задания и подбором котельного оборудования под ваш объект.</p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <a href="tel:+73512208088" style={{display:'inline-flex',alignItems:'center',padding:'11px 22px',borderRadius:999,background:'var(--accent)',color:'#000',fontWeight:600,fontSize:14}}>+7 (351) 220-80-88</a>
              <a href="mailto:kotli@teplo-en.ru" style={{display:'inline-flex',alignItems:'center',padding:'11px 22px',borderRadius:999,border:'1px solid var(--border-strong)',color:'var(--accent)',fontWeight:600,fontSize:14,transition:'border-color .2s'}}>kotli@teplo-en.ru</a>
            </div>
          </div>

          {article.id === 7 && <>
          <h2 style={{fontSize:26,fontWeight:500,letterSpacing:'-0.02em',margin:'48px 0 22px'}}>Модельный ряд пеллетных горелок BIZON ALFA</h2>
          <div className="bizon-grid">
            {[
              { power: '20', price: '99 000 ₽' },
              { power: '30', price: '109 000 ₽' },
              { power: '40', price: '123 000 ₽' },
              { power: '50', price: '136 000 ₽' },
              { power: '60', price: '147 000 ₽' },
              { power: '80', price: '210 000 ₽' },
              { power: '90', price: '210 000 ₽' },
              { power: '100', price: '210 000 ₽' },
              { power: '150', price: '249 000 ₽' },
            ].map((m) => (
              <div key={m.power} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:20,display:'flex',flexDirection:'column',gap:10}}>
                <h3 style={{fontSize:15,fontWeight:500,lineHeight:1.35,color:'var(--text)'}}>Пеллетная горелка BIZON ALFA {m.power} кВт</h3>
                <div style={{fontSize:20,fontWeight:600,color:'var(--accent)'}}>{m.price}</div>
                <div style={{fontSize:13,color:'var(--muted-2)'}}>В наличии</div>
                <a href={`tel:+73512208088`} style={{marginTop:'auto',textAlign:'center',padding:'9px 10px',borderRadius:999,background:'var(--accent)',color:'#000',fontWeight:600,fontSize:14}}>Консультация</a>
              </div>
            ))}
          </div>
          </>}

          <div style={{marginTop:48,borderTop:'1px solid var(--border)',paddingTop:24}}>
            <a href="/blog/" style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:14,fontWeight:600,color:'var(--accent)'}}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}><path d="M17 10H3M8 4l-6 6 6 6"/></svg>
              Все статьи
            </a>
          </div>
        </div>
      </div>
    </>
  );
}