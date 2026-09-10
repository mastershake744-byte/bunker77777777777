import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/data/seo';

export const metadata: Metadata = {
  title: 'Реквизиты и контакты — Теплоэнергетика',
  description: 'Адрес, телефоны, email и карта компании Теплоэнергетика. Челябинск, ул. Автодорожная, д. 17.',
  alternates: { canonical: `${SITE_URL}/adress` },
  openGraph: {
    title: 'Реквизиты и контакты | Теплоэнергетика',
    description: 'Адрес, телефоны, email и карта компании Теплоэнергетика.',
    url: `${SITE_URL}/adress`,
  },
};

export default function AdressPage() {
  return (
    <section className="requisites-page">
      <div className="requisites-container">
        <h1 className="requisites-title">Реквизиты и контакты</h1>

        <div className="requisites-layout">
          {/* ЛЕВАЯ СЕКЦИЯ: Адрес + телефоны + email */}
          <div className="requisites-card">
            <h2>🏢 Адрес и связь</h2>

            <div className="requisite-item">
              <span className="requisite-label">📍 Адрес</span>
              <div className="requisite-value" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>
                454902, г. Челябинск,<br />
                ул. Автодорожная, д. 17
              </div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">📞 Телефоны</span>
              <div className="requisite-value" style={{ fontSize: 18, fontWeight: 600 }}>
                <a href="tel:+73512208088">+7 (351) 220-80-88</a><br />
                <a href="tel:+79823249525" style={{ fontWeight: 500, fontSize: 16 }}>8 982 324-95-25</a>
              </div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">✉ Email</span>
              <div className="requisite-value" style={{ fontSize: 17 }}>
                <a href="mailto:kotli@teplo-en.ru">kotli@teplo-en.ru</a><br />
                <span style={{ fontSize: 15, color: '#7b8490', display: 'block', marginTop: 2 }}>
                  Почта инженера: <a href="mailto:rdv@teplo-en.ru" style={{ fontWeight: 500 }}>rdv@teplo-en.ru</a>
                </span>
              </div>
            </div>

            <div className="requisites-note">
              <strong>📌 Время работы</strong>
              Пн–Пт: 9:00 – 18:00 (по Челябинску)<br />
              Сб–Вс: выходной
            </div>
          </div>

          {/* ПРАВАЯ СЕКЦИЯ: Карта (iframe) */}
          <div className="requisites-map-card">
            <div className="map-placeholder">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A791129d20d15c1acd6e8a4ddd866c4734b3842eac01b9bb72c13c9fc4c3f3ca3&amp;source=constructor"
                width="600"
                height="450"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div style={{ padding: '16px 20px 20px' }}>
              <div className="requisites-contacts-grid">
                <div className="contact-block">
                  <div className="label">📞 Телефон</div>
                  <div className="value"><a href="tel:+73512208088">+7 (351) 220-80-88</a></div>
                  
                </div>
                <div className="contact-block">
                  <div className="label">✉ Email</div>
                  <div className="value"><a href="mailto:kotli@teplo-en.ru">kotli@teplo-en.ru</a></div>
                  <div className="sub">инженер: <a href="mailto:rdv@teplo-en.ru" style={{ color: 'inherit' }}>rdv@teplo-en.ru</a></div>
                </div>
              </div>
              <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 14, color: 'inherit', opacity: 0.9 }}>
                  <span>🚚 Доставка по РФ</span>
                  <span>🛠 Сервисное обслуживание</span>
                  <span>📋 Гарантия 5 лет</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}