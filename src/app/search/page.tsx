'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { boilersData } from '@/data/products';
import { Suspense, useMemo } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return boilersData.filter((b) => {
      const name = b.name.toLowerCase();
      return tokens.every((t) => name.includes(t));
    });
  }, [query]);

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
*{box-sizing:border-box;margin:0;padding:0}
body{
font-family:Arial,sans-serif;
background:var(--bg);
color:var(--text);
transition:.3s;
}
.search-page{
max-width:900px;
margin:0 auto;
padding:40px 24px;
}
.search-title{
font-size:36px;font-weight:900;margin-bottom:8px;
}
.search-title span{color:var(--accent)}
.search-sub{
color:var(--muted);font-size:16px;margin-bottom:32px;
}
.search-box{
display:flex;gap:12px;margin-bottom:40px;
}
.search-box input{
flex:1;padding:14px 20px;border-radius:12px;
border:1px solid #5555;background:var(--card);color:var(--text);
font-size:16px;outline:none;transition:border-color .2s;
}
.search-box input:focus{border-color:var(--accent)}
.search-box input::placeholder{color:var(--muted)}
.search-box button{
padding:14px 28px;border-radius:12px;border:none;
background:var(--accent);color:#000;font-weight:700;font-size:16px;
cursor:pointer;transition:opacity .2s;
}
.search-box button:hover{opacity:.85}

.result-count{font-size:14px;color:var(--muted);margin-bottom:20px}
.result-count b{color:var(--text)}

.result-list{display:flex;flex-direction:column;gap:12px}
.result-item{
display:flex;align-items:center;gap:20px;
padding:16px 20px;border-radius:14px;
background:var(--card);border:1px solid #5553;
text-decoration:none;color:inherit;
transition:border-color .2s, transform .2s;
}
.result-item:hover{border-color:var(--accent);transform:translateX(4px)}
.result-img{
width:80px;height:80px;flex-shrink:0;border-radius:10px;
background:var(--bg);display:flex;align-items:center;justify-content:center;
overflow:hidden;
}
.result-img img{width:100%;height:100%;object-fit:contain;padding:8px}
.result-info{flex:1;min-width:0}
.result-info .model{
font-size:11px;text-transform:uppercase;letter-spacing:1px;
color:var(--muted);margin-bottom:2px;
}
.result-info h3{font-size:16px;font-weight:700;margin-bottom:4px;line-height:1.2}
.result-info .specs{font-size:13px;color:var(--muted)}
.result-info .specs span{color:var(--text);font-weight:600}
.result-price{
font-size:18px;font-weight:800;color:var(--accent);white-space:nowrap;
}

.empty-state{
text-align:center;padding:80px 20px;color:var(--muted);
}
.empty-state svg{width:64px;height:64px;opacity:.3;margin-bottom:16px}
.empty-state h2{font-size:24px;color:var(--text);margin-bottom:8px}
.empty-state p{font-size:15px;line-height:1.5}

@media(max-width:600px){
.search-page{padding:24px 16px}
.search-title{font-size:28px}
.search-box{flex-direction:column}
.result-item{padding:12px 14px;gap:14px;flex-wrap:wrap}
.result-img{width:60px;height:60px}
.result-price{font-size:16px}
}
      `}</style>

      <div className="search-page">
        <h1 className="search-title">Поиск <span>товаров</span></h1>
        <p className="search-sub">Введите название модели, мощность или категорию</p>

        <form className="search-box" method="GET" action="/search/">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Например: BOSS 140, пеллетный, 15 кВт..."
            autoFocus
          />
          <button type="submit">Найти</button>
        </form>

        {query.trim() ? (
          results.length > 0 ? (
            <>
              <div className="result-count">Найдено <b>{results.length}</b> товаров по запросу «{query}»</div>
              <div className="result-list">
                {results.map((b) => (
                  <Link key={b.id} href={`/product/${b.url.replace(/\/$/, '')}/`} className="result-item">
                    <div className="result-img">
                      <img src={b.photo} alt={b.name} loading="lazy" />
                    </div>
                    <div className="result-info">
                      <div className="model">{b.razdel}</div>
                      <h3>{b.name}</h3>
                      <div className="specs">
                        {b.characteristics.power} · бункер {b.characteristics.bunkerVolume} · {b.availability === 'в наличии' ? 'В наличии' : 'Под заказ'}
                      </div>
                    </div>
                    <div className="result-price">{b.price}</div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                <path d="M8 11h6"/><path d="M11 8v6"/>
              </svg>
              <h2>Товар не найден</h2>
              <p>По запросу «{query}» ничего не найдено.<br/>Попробуйте изменить поисковый запрос.</p>
            </div>
          )
        ) : (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <h2>Введите запрос</h2>
            <p>Например: «BOSS 140», «пеллетный 15 кВт», «Eko Max»</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search-page" style={{padding:40,textAlign:'center',color:'var(--muted)'}}>Загрузка...</div>}>
      <SearchContent />
    </Suspense>
  );
}