import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SITE_URL } from '@/data/seo';

export function generateStaticParams() {
  return articles.map((a) => ({ url: a.url.replace(/\/$/, '') }));
}

export function generateMetadata({ params }: { params: { url: string } }): Metadata {
  const article = articles.find((a) => a.url.replace(/\/$/, '') === params.url.replace(/\/$/, ''));
  if (!article) return {};
  return {
    title: article.seo_title,
    description: article.seo_description,
    alternates: { canonical: `${SITE_URL}/blog/${params.url}/` },
    openGraph: {
      title: article.seo_title,
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
    <section className="blog-article-section" style={{padding:'20px 30px',maxWidth:1000,margin:'0 auto'}}>
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav style={{marginBottom:20,fontSize:14,color:'var(--muted)',display:'flex',gap:6,alignItems:'center'}}>
        <a href="/" style={{color:'var(--muted)',textDecoration:'none'}}>Главная</a>
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
        <a href="/blog/" style={{color:'var(--muted)',textDecoration:'none'}}>Статьи</a>
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
        <span className="current" style={{color:'var(--text)'}}>{article.name}</span>
      </nav>

      <div className="blog-tags" style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
        {article.tags.map(t => (
          <span key={t} style={{fontSize:12,padding:'4px 12px',borderRadius:20,background:'var(--accent)',color:'#000',fontWeight:600}}>{t}</span>
        ))}
      </div>

      <h1 style={{fontSize:28,fontWeight:800,lineHeight:1.2,marginBottom:20}}>{article.name}</h1>

      <div style={{width:'50%',aspectRatio:'16/9',borderRadius:14,overflow:'hidden',marginBottom:24,background:'var(--bg)'}}>
        <img src={article.photo} alt={article.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </div>

      <style>{`
.article-html h2{font-size:24px;font-weight:800;line-height:1.25;margin:44px 0 18px;color:var(--text)}
.article-html h3{font-size:19px;font-weight:700;line-height:1.3;margin:32px 0 14px;color:var(--text)}
.article-html p{margin:0 0 18px}
.article-html ul,.article-html ol{margin:0 0 20px;padding-left:22px}
.article-html li{margin-bottom:8px}
.article-html img{max-width:100%;border-radius:14px;margin:20px 0;display:block;height:auto}
.article-html figure{margin:22px 0}
.article-html figcaption{font-size:13px;color:var(--muted);margin-top:8px;text-align:center}
.article-html blockquote{border-left:4px solid var(--accent);background:var(--card);padding:18px 22px;border-radius:12px;margin:24px 0;font-style:italic}
.article-html table{width:100%;border-collapse:collapse;margin:24px 0;font-size:14px;line-height:1.5}
.article-html th{background:var(--accent);color:#000;font-weight:700;padding:10px 12px;text-align:left}
.article-html td{padding:10px 12px;border-bottom:1px solid #5553;vertical-align:top}
.article-html tr:nth-child(even) td{background:var(--card)}
.article-html a{color:var(--accent);text-decoration:none;font-weight:600}
.article-html .calc-box{background:var(--card);border:1px solid #5553;border-radius:14px;padding:20px 24px;margin:22px 0;font-size:15px}
.article-html .calc-box b{color:var(--accent)}
.article-html .note-box{background:var(--card);border:1px solid #5553;border-left:4px solid var(--accent);border-radius:12px;padding:16px 20px;margin:22px 0;font-size:15px}
@media(max-width:600px){.article-html table{font-size:13px}.article-html th,.article-html td{padding:8px}}
`}</style>
      <article className="article-html" style={{fontSize:16,lineHeight:1.8,color:'var(--text)',wordBreak:'break-word'}} dangerouslySetInnerHTML={{ __html: article.text }} />

      <div style={{marginTop:40,padding:'26px 28px',borderRadius:16,background:'var(--card)',border:'1px solid #5553'}}>
        <div style={{fontSize:17,fontWeight:700,marginBottom:10}}>Нужна помощь с расчётом и подбором котельной?</div>
        <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.6,marginBottom:14}}>Наши инженеры бесплатно помогут с тепловым расчётом, составлением технического задания и подбором котельного оборудования под ваш объект.</p>
        <p style={{fontSize:15,lineHeight:1.8,margin:0}}>
          Телефон: <a href="tel:+73512208088" style={{color:'var(--accent)',textDecoration:'none',fontWeight:700}}>+7 (351) 220-80-88</a>&nbsp;&nbsp;·&nbsp;&nbsp;
          Почта: <a href="mailto:kotli@teplo-en.ru" style={{color:'var(--accent)',textDecoration:'none',fontWeight:700}}>kotli@teplo-en.ru</a>
        </p>
      </div>

      {article.id === 7 && <>
      <h2 style={{fontSize:24,fontWeight:800,lineHeight:1.2,margin:'40px 0 20px'}}>Модельный ряд пеллетных горелок BIZON ALFA</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
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
          <div key={m.power} style={{background:'var(--card)',border:'1px solid #5553',borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'column'}}>
            <div style={{aspectRatio:'4/3',overflow:'hidden',background:'var(--bg)'}}>
              <img src={article.photo} alt={`Пеллетная горелка BIZON ALFA ${m.power} кВт`} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            </div>
            <div style={{padding:14,display:'flex',flexDirection:'column',flex:1}}>
              <h3 style={{fontSize:15,fontWeight:700,lineHeight:1.3,marginBottom:8,color:'var(--text)'}}>Пеллетная горелка BIZON ALFA {m.power} кВт</h3>
              <div style={{fontSize:18,fontWeight:800,color:'var(--accent)',marginBottom:10}}>{m.price}</div>
              <div style={{fontSize:13,color:'var(--muted)',marginBottom:12}}>В наличии</div>
              <div style={{marginTop:'auto',display:'flex',gap:8}}>
                <a href={`tel:+73512208088`} style={{flex:1,textAlign:'center',padding:'9px 10px',borderRadius:8,background:'var(--accent)',color:'#000',fontWeight:700,fontSize:14,textDecoration:'none'}}>Консультация</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </>}

      <div style={{marginTop:30,borderTop:'1px solid #5553',paddingTop:20}}>
        <a href="/blog/" className="blog-footer" style={{fontSize:14,fontWeight:600,color:'var(--accent)',textDecoration:'none'}}>← Все статьи</a>
      </div>
    </section>
  );
}