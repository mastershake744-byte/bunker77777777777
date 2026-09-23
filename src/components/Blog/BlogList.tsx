import Link from 'next/link';
import { articles } from '@/data/articles';

const PER_PAGE = 9;

interface BlogListProps {
  page?: number;
}

export default function BlogList({ page = 1 }: BlogListProps) {
  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const ordered = [...articles].reverse();
  const pageArticles = ordered.slice(start, start + PER_PAGE);

  return (
    <>
      <style>{`
*{box-sizing:border-box;margin:0;padding:0}
.blog-scope{
--bg:#050807;
--card:#0d1210;
--card-hover:#111916;
--text:#ddffdc;
--muted:#8cab87;
--muted-2:#677d64;
--accent:#7fee64;
--border:#26302b;
--border-strong:#3e4a3c;
font-family:'Inter','Segoe UI',Arial,sans-serif;
background:var(--bg);
color:var(--text);
letter-spacing:-0.01em;
}
body.light-mode .blog-scope{
--bg:#f6f2ea;
--card:#ffffff;
--card-hover:#fbfaf5;
--text:#1c1a16;
--muted:#6b6a5f;
--muted-2:#8a8778;
--accent:#1e7e34;
--border:rgba(0,0,0,.09);
--border-strong:rgba(0,0,0,.16);
}
.blog-container{max-width:1280px;margin:0 auto;padding:0 24px}
.blog-scope a{color:inherit;text-decoration:none}

/* crumbs */
.blog-crumbs{display:flex;align-items:center;gap:8px;padding:28px 0 0;color:var(--muted-2);font-size:13px;font-weight:500;flex-wrap:wrap}
.blog-crumbs a{color:var(--muted-2);transition:color .2s}
.blog-crumbs a:hover{color:var(--accent)}
.blog-crumbs svg{width:14px;height:14px;opacity:.5}
.blog-crumbs .cur{color:var(--text)}

/* hero */
.blog-hero{padding:72px 0 48px}
.blog-badge{
display:inline-flex;align-items:center;gap:8px;
padding:6px 14px;border-radius:999px;
font-size:12px;font-weight:600;letter-spacing:.02em;
color:var(--accent);border:1px solid var(--border-strong);
background:rgba(127,238,100,.05);
margin-bottom:28px;
}
.blog-hero h1{
font-size:clamp(40px,6vw,72px);
font-weight:500;line-height:1.05;letter-spacing:-0.03em;
max-width:16em;
}
.blog-hero h1 span{color:var(--accent)}
.blog-desc{
margin-top:24px;font-size:18px;line-height:1.6;color:var(--muted);
max-width:640px;
}
.blog-count{
margin-top:36px;display:inline-flex;align-items:center;gap:10px;
font-size:13px;color:var(--muted-2);font-weight:500;
}
.blog-count::before{content:'';width:32px;height:1px;background:var(--border-strong)}

/* grid */
.blog-grid-wrap{border-top:1px solid var(--border);padding:48px 0 24px}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.blog-card{
display:flex;flex-direction:column;gap:18px;
background:var(--card);
border:1px solid var(--border);
border-radius:12px;
padding:28px;
transition:border-color .2s,background .2s,transform .2s;
}
.blog-card:hover{
border-color:var(--accent);
background:var(--card-hover);
transform:translateY(-2px);
}
.blog-card-tags{display:flex;flex-wrap:wrap;gap:6px}
.blog-tag{
font-size:11px;font-weight:600;letter-spacing:.02em;
padding:4px 10px;border-radius:999px;
color:var(--accent);border:1px solid var(--border-strong);
background:rgba(127,238,100,.05);
}
body.light-mode .blog-tag{background:rgba(30,126,52,.05)}
.blog-card h3{
font-size:19px;font-weight:500;line-height:1.35;letter-spacing:-0.015em;color:var(--text);
transition:color .2s;
}
.blog-card:hover h3{color:var(--accent)}
.blog-excerpt{font-size:14px;line-height:1.65;color:var(--muted);flex:1}
.blog-more{
display:inline-flex;align-items:center;gap:8px;
font-size:13px;font-weight:600;color:var(--accent);
}
.blog-more svg{width:15px;height:15px;transition:transform .2s}
.blog-card:hover .blog-more svg{transform:translateX(4px)}

/* pagination */
.blog-pagination{display:flex;align-items:center;justify-content:center;gap:8px;padding:40px 0 16px}
.blog-pagination a{
display:inline-flex;align-items:center;justify-content:center;
min-width:40px;height:40px;padding:0 14px;
border-radius:999px;
border:1px solid var(--border-strong);
color:var(--muted);
font-size:14px;font-weight:500;
transition:all .2s;
}
.blog-pagination a:hover{color:var(--accent);border-color:var(--accent)}
.blog-pagination a.active{
background:var(--accent);color:#000;font-weight:700;border-color:var(--accent);
}
.blog-pagination a.arrow{font-size:20px;font-weight:400}
.blog-pagination .dots{color:var(--muted-2);letter-spacing:2px;padding:0 4px}

@media(max-width:1100px){.blog-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:800px){.blog-hero{padding:48px 0 36px}.blog-grid-wrap{padding:36px 0 16px}}
@media(max-width:640px){
.blog-grid{grid-template-columns:1fr}
.blog-container{padding:0 16px}
.blog-card{padding:22px}
.blog-desc{font-size:16px}
}
      `}</style>

      <div className="blog-scope">
        <div className="blog-container">
          <nav className="blog-crumbs" aria-label="Breadcrumb">
            <a href="/">Главная</a>
            <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            <span className="cur">Статьи</span>
          </nav>

          <header className="blog-hero">
            <div className="blog-badge">Блог Теплоэнергетики</div>
            <h1>Полезные <span>статьи</span></h1>
            <p className="blog-desc">Советы по выбору и эксплуатации котлов, обзоры топлива и технологий отопления.</p>
            <div className="blog-count">{articles.length} статей</div>
          </header>

          <div className="blog-grid-wrap">
            <div className="blog-grid">
              {pageArticles.map((a) => (
                <Link key={a.id} href={`/blog/${a.url.replace(/\/$/, '')}/`} className="blog-card">
                  <div className="blog-card-tags">
                    {a.tags.slice(0, 2).map((t) => (
                      <span key={t} className="blog-tag">{t}</span>
                    ))}
                  </div>
                  <h3>{a.name}</h3>
                  <p className="blog-excerpt">{a.text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 140)}...</p>
                  <div className="blog-more">
                    Читать
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h14M12 4l6 6-6 6"/></svg>
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
        </div>
      </div>
    </>
  );
}