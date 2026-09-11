import React from 'react';

export default function Hero3D() {
  return (
    <>
      <main className="hero py-20 md:py-32 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Текстовая часть */}
            <div className="hero-text">
              <div className="badge inline-block px-4 py-2 rounded-full text-xs font-semibold mb-4 border transition-all duration-300" id="heroBadge">
                Теплоэнергетика
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Пеллетные и твердотопливные котлы<span className="transition-all duration-300" id="heroSpan"> Вулкан с бункером</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-8 transition-all duration-300" id="heroText">
                Автоматизированная подача пеллет, вместительный бункер и стабильная работа даже в условиях ограниченной транспортной доступности — решение для удалённых объектов. Котлы Вулкан от 11 до 1200 кВт в наличии на складе в Красноярске.
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4">
                <a href="/shop/" className="px-8 py-3 rounded-lg font-semibold inline-block text-center" id="btnPrimary" style={{textDecoration:'none'}}>
                  Подобрать котёл
                </a>
                <a href="/shop/" className="border-2 px-8 py-3 rounded-lg font-semibold inline-block text-center" id="btnSecondary" style={{textDecoration:'none'}}>
                  Смотреть каталог
                </a>
              </div>
            </div>

            {/* Визуальная часть */}
            <div className="hero-image-block">
              <img
                id="heroGif"
                src="/gif/green.gif"
                alt="Пеллетный котёл Вулкан с бункером"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        {/* Содержимое контейнера */}
      </div>
    </>
  );
}