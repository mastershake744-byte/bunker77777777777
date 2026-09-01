import { categories } from '@/data/categories';
import Link from 'next/link';

export default function CategoryListPage() {
  return (
    <>
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
.breadcrumbs{
padding:20px 30px;
color:var(--muted);
display:flex;align-items:center;gap:6px;flex-wrap:wrap;
}
.breadcrumbs a{color:var(--muted);text-decoration:none}
.breadcrumbs a:hover{color:var(--accent)}
.breadcrumbs svg{width:16px;height:16px}
.breadcrumbs .current{color:var(--text)}
.catalog-header{padding:0 30px;margin-bottom:30px}
.catalog-badge{
display:inline-block;padding:5px 14px;border-radius:20px;font-size:13px;
background:var(--accent);color:#000;font-weight:600;margin-bottom:14px;
}
.catalog-title{font-size:36px;font-weight:800;line-height:1.1;margin-bottom:12px;color:var(--text)}
.catalog-title span{color:var(--accent)}
.catalog-desc{color:var(--muted);line-height:1.6;max-width:500px;margin-bottom:14px}
.grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:18px;padding:0 30px;
}
.cat-card{
background:var(--card);
border-radius:14px;
padding:24px;
border:1px solid #5553;
display:flex;flex-direction:column;
text-decoration:none;color:inherit;
transition:border-color .2s;
}
.cat-card:hover{border-color:var(--accent)}
.cat-model{
font-size:12px;text-transform:uppercase;letter-spacing:1px;
color:var(--muted);margin-bottom:6px;
}
.cat-card h3{font-size:18px;font-weight:700;margin-bottom:10px}
.cat-card p{font-size:13px;color:var(--muted);line-height:1.5;flex:1;margin-bottom:14px}
.cat-footer{border-top:1px solid #5553;padding-top:12px;font-size:14px;font-weight:600;color:var(--accent)}
@media(max-width:1100px){.grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:800px){.grid{grid-template-columns:1fr 1fr}.catalog-title{font-size:26px}}
@media(max-width:500px){.grid{grid-template-columns:1fr}}
      `}</style>

      <section className="catalog-section">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Главная</a>
          <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
          <span className="current">Категории</span>
        </nav>

        <div className="catalog-header">
          <div className="catalog-badge">Категории</div>
          <h1 className="catalog-title">Каталог <span>котлов</span></h1>
          <p className="catalog-desc">Автоматические пеллетные и твердотопливные котлы с бункером. Выберите серию:</p>
        </div>

        <div className="grid">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.url.replace(/\/$/, '')}/`} className="cat-card">
              <div className="cat-model">Категория</div>
              <h3>{cat.name}</h3>
              <p>{cat.text.slice(0, 120)}...</p>
              <div className="cat-footer">{cat.products.length} товаров →</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}