import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="not-found-section">
      <style>{`
.not-found-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 40px 20px;
  background: var(--bg-page);
  color: var(--text);
}
.not-found-gif {
  max-width: 500px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 0 40px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}
.not-found-title {
  font-size: 72px;
  font-weight: 900;
  color: var(--accent);
  margin: 0;
  line-height: 1;
}
.not-found-subtitle {
  font-size: 20px;
  color: var(--text-muted);
  margin: 16px 0 30px;
  max-width: 400px;
}
.not-found-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent);
  color: #000;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity .2s;
}
.not-found-link:hover {
  opacity: .85;
}
      `}</style>

      <img
        className="not-found-gif"
        src="https://media1.tenor.com/m/1r-yaqapZMgAAAAd/king-kong-vs-godzilla-godzilla.gif"
        alt="Годзилла и Конг кидаются камнями"
      />

      <h1 className="not-found-title">404</h1>
      <p className="not-found-subtitle">
        Страница не найдена — её словно унесло камнем от Годзиллы
      </p>

      <Link href="/catalog" className="not-found-link">
        Перейти в каталог
        <span>→</span>
      </Link>
    </section>
  );
}