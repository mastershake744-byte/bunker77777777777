import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            <svg viewBox="0 0 120 120" fill="none" style={{ width: 38, height: 38, color: 'var(--accent)' }}>
              <path d="M15 55L60 15L105 55V98C105 102 102 105 98 105H22C18 105 15 102 15 98V55Z" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 55V35H35V48" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M35 60H85C95 60 100 67 100 75" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
              <path d="M45 78H75" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
              <path d="M60 78V103" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
              <path d="M52 103V112M60 103V112M68 103V112" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </a>
          <p className="footer-description">
            Надёжные отопительные решения<br/>
            для частных домов и коммерческих помещений
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Telegram">
              <svg viewBox="0 0 24 24"><path d="M21.5 3.5L18.1 20c-.25 1.17-.92 1.46-1.87.91l-5.15-3.8-2.49 2.4c-.28.28-.51.51-1.04.51l.37-5.24 9.53-8.61c.41-.37-.09-.58-.64-.21L4.9 13.48.01 11.95c-1.06-.33-1.08-1.06.22-1.57L19.3 3.13c.87-.32 1.63.2 1.2.37Z"/></svg>
            </a>
            <a href="#" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M20.5 3.5A11.85 11.85 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.13 1.6 5.93L.12 24l6.35-1.67a11.83 11.83 0 0 0 5.61 1.42h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.45-8.39ZM12.09 21.7h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.83 9.83 0 0 1-1.5-5.2C2.22 6.44 6.65 2 12.09 2a9.84 9.84 0 0 1 9.84 9.85c0 5.44-4.43 9.85-9.84 9.85Z"/><path d="M17.82 14.48c-.31-.16-1.84-.91-2.12-1.01-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.71-.97-2.34-.26-.63-.52-.54-.71-.55h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62s1.13 3.04 1.29 3.25c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.8.65.76.24 1.45.21 1.99.13.61-.09 1.84-.75 2.1-1.47.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36Z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
            </a>
            <a href="#" aria-label="VK"><span className="vk-icon">vk</span></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Каталог</h3>
          <nav>
            <a href="#">Твердотопливные котлы</a>
            <a href="#">Электрические котлы</a>
            <a href="#">Газовые котлы</a>
            <a href="https://modulkotel.ru/category/zapchasti-dlja-kotlov/">Комплектующие</a>
            <a href="#">Дымоходы</a>
          </nav>
        </div>

        <div className="footer-column">
          <h3>Информация</h3>
          <nav>
            <a href="#">Доставка</a>
            <a href="#">Оплата</a>
            <a href="#">Гарантия</a>
            <a href="#">Статьи</a>
            <a href="#">Контакты</a>
          </nav>
        </div>

        <div className="footer-contacts">
          <h3>Контакты</h3>
          <a href="tel:88001234567" className="contact-item">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24"><path d="M21 16.5v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.5 6.18 2 2 0 0 1 5.5 4h3a2 2 0 0 1 2 1.72c.12.9.34 1.77.66 2.61a2 2 0 0 1-.45 2.11L9.44 11.7a16 16 0 0 0 2.86 2.86l1.26-1.27a2 2 0 0 1 2.11-.45c.84.32 1.71.54 2.61.66A2 2 0 0 1 20 15.5l1 .99Z"/></svg>
            </span>
            <span>
              <strong>8 (800) 123-45-67</strong>
              <small>Ежедневно с 9:00 до 20:00</small>
            </span>
          </a>
          <a href="mailto:info@teplodom.ru" className="contact-item">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
            </span>
            <span>
              <strong>info@teplodom.ru</strong>
              <small>Ответим в течение 15 минут</small>
            </span>
          </a>
          <div className="contact-item">
            <span className="contact-icon">
              <svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
            </span>
            <span>
              <strong>Москва, ул. Примерная, 12</strong>
              <small>Шоу-рум и офис</small>
            </span>
          </div>
          <a href="#" className="map-button">Показать на карте</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2025 ТеплоДом. Все права защищены.
          <div className="footer-legal">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}