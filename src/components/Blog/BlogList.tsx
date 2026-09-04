import Link from 'next/link';
import { articles } from '@/data/articles';
import { SITE_URL } from '@/data/seo';

const PER_PAGE = 4;

interface BlogListProps {
  page?: number;
}

export default function BlogList({ page = 1 }: BlogListProps) {
  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageArticles = articles.slice(start, start + PER_PAGE);

  return (
    <>
      <style>{`
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
.blog-breadcrumbs{
padding:20px 0;
color:var(--muted);
display:flex;align-items:center;gap:6px;flex-wrap:wrap;
}
.blog-breadcrumbs a{color:var(--muted);text-decoration:none}
.blog-breadcrumbs a:hover{color:var(--accent)}
.blog-breadcrumbs svg{width:16px;height:16px}
.blog-breadcrumbs .current{color:var(--text)}
.blog-header{margin-bottom:30px}
.blog-badge{
display:inline-block;padding:5px 14px;border-radius:20px;font-size:13px;
background:var(--accent);color:#000;font-weight:600;margin-bottom:14px;
}
.blog-title{font-size:36px;font-weight:800;line-height:1.1;margin-bottom:12px;color:var(--text)}
.blog-title span{color:var(--accent)}
.blog-desc{color:var(--muted);line-height:1.6;max-width:500px;margin-bottom:14px}
.blog-grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:18px;
}
.blog-card{
background:var(--card);
border-radius:14px;
overflow:hidden;
border:1px solid #5553;
display:flex;flex-direction:column;
text-decoration:none;color:inherit;
transition:border-color .2s, transform .2s;
}
.blog-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.blog-card-image{
position:relative;
aspect-ratio:16/9;
background:var(--bg);
overflow:hidden;
}
.blog-card-image img{width:100%;height:100%;object-fit:cover}
.blog-card-body{
padding:18px;
display:flex;flex-direction:column;flex:1;
}
.blog-tags{
display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;
}
.blog-tag{
font-size:11px;padding:3px 10px;border-radius:20px;
background:var(--accent);color:#000;font-weight:600;
}
.blog-card h3{font-size:16px;font-weight:700;margin-bottom:10px;line-height:1.3}
.blog-card p{font-size:13px;color:var(--muted);line-height:1.5;flex:1;margin-bottom:14px}
.blog-footer{
border-top:1px solid #5553;padding-top:12px;
font-size:14px;font-weight:600;color:var(--accent);
}
.blog-pagination{
display:flex;justify-content:center;align-items:center;gap:8px;
margin-top:40px;
}
.blog-pagination a{
display:inline-flex;align-items:center;justify-content:center;
min-width:38px;height:38px;border-radius:8px;
background:var(--card);color:var(--text);text-decoration:none;
font-size:14px;border:1px solid #5553;
}
.blog-pagination a.active{
background:var(--accent);color:#000;font-weight:700;border-color:var(--accent);
}
.blog-pagination a.arrow{font-size:22px;font-weight:400}
.blog-pagination .dots{color:var(--muted);letter-spacing:2px}
@media(max-width:1100px){.blog-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:800px){.blog-grid{grid-template-columns:1fr 1fr}.blog-title{font-size:26px}}
@media(max-width:500px){.blog-grid{grid-template-columns:1fr}}
      `}</style>

      <section className="blog-section">
        <div className="container">
          <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Главная</a>
            <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            <span className="current">Статьи</span>
          </nav>

          <div className="blog-header">
            <div className="blog-badge">Блог</div>
            <h1 className="blog-title">Полезные <span>статьи</span></h1>
            <p className="blog-desc">Советы по выбору и эксплуатации котлов, обзоры топлива и технологий отопления.</p>
          </div>

          <div className="blog-grid">
            {pageArticles.map((a) => (
              <Link key={a.id} href={`/blog/${a.url.replace(/\/$/, '')}/`} className="blog-card">
                <div className="blog-card-image">
                  <img src={a.photo} alt={a.name} loading="lazy" />
                </div>
                <div className="blog-card-body">
                  <div className="blog-tags">
                    {a.tags.slice(0, 2).map((t) => (
                      <span key={t} className="blog-tag">{t}</span>
                    ))}
                  </div>
                  <h3>{a.name}</h3>
                  <p>{a.text.length > 120 ? a.text.slice(0, 120) + '...' : a.text}</p>
                  <div className="blog-footer">Читать →</div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Навигация по страницам">
              {currentPage > 1 && (
                <Link href={currentPage === 2 ? '/blog/' : `/blog/?page=${currentPage - 1}`} className="arrow" aria-label="Предыдущая страница">‹</Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={n === 1 ? '/blog/' : `/blog/?page=${n}`}
                  className={n === currentPage ? 'active' : ''}
                >
                  {n}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link href={`/blog/?page=${currentPage + 1}`} className="arrow" aria-label="Следующая страница">›</Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}