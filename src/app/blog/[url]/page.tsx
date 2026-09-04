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
    <section className="blog-article-section" style={{padding:'20px 30px',maxWidth:800,margin:'0 auto'}}>
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

      <div style={{aspectRatio:'16/9',borderRadius:14,overflow:'hidden',marginBottom:24,background:'var(--bg)'}}>
        <img src={article.photo} alt={article.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </div>

      <div style={{fontSize:16,lineHeight:1.8,color:'var(--text)'}}>
        <p>{article.text}</p>
        <p style={{marginTop:20}}>Для получения подробной консультации и расчёта стоимости обращайтесь к нашим специалистам по телефону <a href="tel:+73512208088" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>+7 (351) 220-80-88</a> или по email <a href="mailto:kotli@teplo-en.ru" style={{color:'var(--accent)',textDecoration:'none',fontWeight:600}}>kotli@teplo-en.ru</a>.</p>
      </div>

      <div style={{marginTop:30,borderTop:'1px solid #5553',paddingTop:20}}>
        <a href="/blog/" className="blog-footer" style={{fontSize:14,fontWeight:600,color:'var(--accent)',textDecoration:'none'}}>← Все статьи</a>
      </div>
    </section>
  );
}