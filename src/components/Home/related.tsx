import React from 'react';

export default function RelatedServices() {
  return (
    <section className="careers-section py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="flex-1">
            <div className="inline-block mb-6">
              <span className="text-xs font-bold tracking-widest border-l-2 pl-3 transition-colors duration-300" id="serviceTag">
                ПРОФЕССИОНАЛЬНЫЙ СЕРВИС
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight transition-colors duration-300" id="serviceTitle">
              Котельное оборудование
              <span className="block text-3xl md:text-4xl font-light transition-colors duration-300" id="serviceSubtitle">полный цикл услуг</span>
            </h2>
            <p className="text-base leading-relaxed max-w-xl transition-colors duration-300" id="serviceText">
              Обслуживание, монтаж и поставка котельного оборудования. Пеллетные котельные любой сложности.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="apply-now-btn px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-3 group whitespace-nowrap">
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Карточка 1 */}
          <div className="career-card rounded-xl p-8 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300">
              <svg className="w-6 h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 transition-colors duration-300">Обслуживание котлов</h3>
            <p className="text-sm leading-relaxed transition-colors duration-300">Профессиональное сервисное обслуживание автоматических и пеллетных котлов любой мощности.</p>
          </div>

          {/* Карточка 2 */}
          <div className="career-card rounded-xl p-8 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300">
              <svg className="w-6 h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 transition-colors duration-300">Монтаж котельных</h3>
            <p className="text-sm leading-relaxed transition-colors duration-300">Проектирование и строительство пеллетных котельных «под ключ» любой сложности.</p>
          </div>

          {/* Карточка 3 */}
          <div className="career-card rounded-xl p-8 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300">
              <svg className="w-6 h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 transition-colors duration-300">Доставка оборудования</h3>
            <p className="text-sm leading-relaxed transition-colors duration-300">Поставка котлов и комплектующих напрямую. Цены <span className="font-bold" id="priceSpan">на 10–20% ниже</span> рыночных.</p>
          </div>

          {/* Карточка 4 */}
          <div className="career-card rounded-xl p-8 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300">
              <svg className="w-6 h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 transition-colors duration-300">Гарантия качества</h3>
            <p className="text-sm leading-relaxed transition-colors duration-300">Сертифицированное оборудование, официальные гарантии и постгарантийное обслуживание.</p>
          </div>
        </div>

        <div className="mt-16 h-1 bg-gradient-to-r from-transparent via-current to-transparent rounded-full transition-all duration-300" id="divider"></div>
      </div>
    </section>
  );
}