import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import Link from 'next/link';
import type { Metadata } from 'next';
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

  return (
    <section className="blog-article-section" style={{padding:'20px 30px',maxWidth:1000,margin:'0 auto'}}>
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

      <div style={{fontSize:16,lineHeight:1.8,color:'var(--text)'}}>
        <p>{article.text}</p>
        <p style={{marginTop:20}}>Подробнее о продукции BIZON: <a href="https://modulkotel.ru/product/fakelnaja-pelletnaja-gorelka-na-40-kvt-bizon-alpha/" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>Факельная пеллетная горелка 40 кВт Bizon Alpha</a>.</p>
        <p style={{marginTop:20}}>Для получения подробной консультации и расчёта стоимости обращайтесь к нашим специалистам по телефону <a href="tel:+73512208088" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>+7 (351) 220-80-88</a> или по email <a href="mailto:kotli@teplo-en.ru" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>kotli@teplo-en.ru</a>.</p>
      </div>

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
                <a href="/order/" style={{flex:1,textAlign:'center',padding:'9px 10px',borderRadius:8,background:'var(--accent)',color:'#000',fontWeight:700,fontSize:14,textDecoration:'none'}}>Купить</a>
                <a href="/order/" style={{flex:1,textAlign:'center',padding:'9px 10px',borderRadius:8,border:'1px solid #5555',color:'var(--text)',fontWeight:600,fontSize:14,textDecoration:'none'}}>В 1 клик</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:30,borderTop:'1px solid #5553',paddingTop:20}}>
        <a href="/blog/" className="blog-footer" style={{fontSize:14,fontWeight:600,color:'var(--accent)',textDecoration:'none'}}>← Все статьи</a>
      </div>
    </section>
  );
}