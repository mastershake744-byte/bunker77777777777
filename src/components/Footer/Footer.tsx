import React from 'react';

export default function Footer() {
  return (
    <section className="footer-cta">
      <div className="cta-specialist">
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="12"/>
          <path d="M20 34v-5a12 12 0 0 1 24 0v5"/>
          <path d="M20 33c-4 0-7 2-7 6s3 6 7 6h2V33h-2Z"/>
          <path d="M44 33c4 0 7 2 7 6s-3 6-7 6h-2V33h2Z"/>
          <path d="M51 44c0 6-7 9-13 9"/>
          <path d="M38 53h-4"/>
        </svg>
      </div>

      <div className="cta-content">
        <div className="cta-kicker">
          Нужна помощь с подбором?
        </div>

        <div className="cta-title">
          Наш специалист подберёт котёл
          под ваши параметры бесплатно
        </div>

        <div className="cta-action-row">
          <a href="#" className="cta-button">
            Получить подбор
            <span>→</span>
          </a>

          <a href="tel:+79823249525" className="cta-phone">
            <span className="cta-phone-icon">⌕</span>
            <span>
              8 982 324-95-25
              <small>Ежедневно с 9:00 до 20:00</small>
            </span>
          </a>
        </div>
      </div>

      {/* 1 */}
      <div className="cta-feature">
        <div className="cta-feature-icon">
          <svg viewBox="0 0 32 32">
            <path d="M7 9h18M7 16h18M7 23h18"/>
            <path d="M12 6v6M21 13v6M15 20v6"/>
          </svg>
        </div>
        <div className="cta-feature-title">
          Подбор по вашим параметрам
        </div>
        <div className="cta-feature-text">
          Бесплатно и без обязательств
        </div>
      </div>

      {/* 2 */}
      <div className="cta-feature">
        <div className="cta-feature-icon">
          <svg viewBox="0 0 32 32">
            <path d="M16 3l10 4v8c0 7-4.5 11.5-10 14-5.5-2.5-10-7-10-14V7l10-4Z"/>
            <path d="m11 16 3 3 7-7"/>
          </svg>
        </div>
        <div className="cta-feature-title">
          Расчёт мощности и КПД
        </div>
        <div className="cta-feature-text">
          Подберём оптимальный вариант
        </div>
      </div>

      {/* 3 */}
      <div className="cta-feature">
        <div className="cta-feature-icon">
          <svg viewBox="0 0 32 32">
            <path d="M4 9h17v14H4z"/>
            <path d="M21 14h4l3 4v5h-7z"/>
            <circle cx="10" cy="25" r="3"/>
            <circle cx="24" cy="25" r="3"/>
            <path d="M8 25h-1M21 25h-1"/>
          </svg>
        </div>
        <div className="cta-feature-title">
          Рекомендуем доставку
        </div>
        <div className="cta-feature-text">
          Быстро и надёжно по всей России
        </div>
      </div>

      {/* 4 */}
      <div className="cta-feature">
        <div className="cta-feature-icon">
          <svg viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="8"/>
            <path d="M16 4v3M16 25v3M4 16h3M25 16h3"/>
            <path d="m8 8 2 2M22 22l2 2M24 8l-2 2M10 22l-2 2"/>
            <path d="M16 12v5l3 2"/>
          </svg>
        </div>
        <div className="cta-feature-title">
          Поддержка после покупки
        </div>
        <div className="cta-feature-text">
          Консультации и помощь в эксплуатации
        </div>
      </div>
    </section>
  );
}