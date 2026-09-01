import React from 'react';

export default function Requisites() {
  return (
    <section className="requisites-page">
      <div className="requisites-container">
        <h1 className="requisites-title">Реквизиты «Теплоэнергетика»</h1>

        <div className="requisites-layout">
          {/* Левая колонка: Основные реквизиты */}
          <div className="requisites-card">
            <h2>Основные реквизиты</h2>

            <div className="requisite-item">
              <span className="requisite-label">📌 Юридический адрес</span>
              <div className="requisite-value">454902 г. Челябинск, пос. Шершни, ул. Гостевая 3, офис 103</div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">📮 Почтовый адрес</span>
              <div className="requisite-value">454902 г. Челябинск, пос. Шершни, ул. Гостевая 3, офис 103</div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">🏢 ОГРН</span>
              <div className="requisite-value">1197456013809</div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">📋 ИНН</span>
              <div className="requisite-value">7453327310</div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">📋 КПП</span>
              <div className="requisite-value">745301001</div>
            </div>
          </div>

          {/* Правая колонка: Банковские реквизиты */}
          <div className="requisites-card">
            <h2>Банковские реквизиты</h2>

            <div className="requisite-item">
              <span className="requisite-label">🏦 Банк</span>
              <div className="requisite-value">Филиал Точка Публичного акционерного общества Банка «Финансовая Корпорация Открытие»</div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">🔢 БИК</span>
              <div className="requisite-value">044525104</div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">💳 Корреспондентский счёт</span>
              <div className="requisite-value">30101810745374525104</div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">💳 Расчётный счёт</span>
              <div className="requisite-value">40702810805500005534</div>
            </div>
          </div>
        </div>

        {/* Блок с контактами и директором */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 25, marginTop: 25 }}>
          <div className="requisites-card">
            <h2>Контактная информация</h2>

            <div className="requisite-item">
              <span className="requisite-label">📧 E-mail</span>
              <div className="requisite-value">
                <a href="mailto:kotli@teplo-en.ru" className="requisite-email-link">kotli@teplo-en.ru</a>
              </div>
            </div>

            <div className="requisite-item">
              <span className="requisite-label">📧 Дополнительный e-mail</span>
              <div className="requisite-value">
                <a href="mailto:stovespares@gmail.com" className="requisite-email-link">stovespares@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="requisites-card">
            <h2>Руководство</h2>

            <div className="requisite-item">
              <span className="requisite-label">👤 Директор</span>
              <div className="requisite-value">
                <strong>Дмитрий Владимирович Растворов</strong>
                <div style={{ marginTop: 8, fontSize: 14, color: '#7b8490', lineHeight: 1.4 }}>
                  Действует на основании устава
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Примечание */}
        <div className="requisites-note">
          <strong style={{ display: 'block', marginBottom: 4, color: '#1c2530' }}>📄 Важно</strong>
          Все реквизиты актуальны на текущий момент. При возникновении вопросов свяжитесь с нами по указанным контактам.
        </div>
      </div>
    </section>
  );
}