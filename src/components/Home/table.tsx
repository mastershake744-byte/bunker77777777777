import React from 'react';

export default function BoilerTable() {
  return (
    <>
      <div className="container">
        {/* ===== ЗАГОЛОВОК ===== */}
        <div className="page-header">
          <h1>Устройство котла c бункером</h1>
          <p>Автоматические твердотопливные водогрейные котлы. Основные конструктивные элементы и их назначение.</p>
        </div>

        {/* ===== ПЕРЕКЛЮЧАТЕЛЬ ===== */}
        <div className="demo-controls">
          <div className="toggle-switch" id="toggleSwitch">
            <span className="slider-bg"></span>
            <span className="toggle-option active" data-value="all">Все элементы</span>
            <span className="toggle-option" data-value="short">Основные</span>
          </div>
        </div>

        {/* ===== ТАБЛИЦА ===== */}
        <div className="table-wrap">
          <table className="full-table" id="partsTable">
            <thead>
              <tr>
                <th className="col-num">№</th>
                <th className="col-name">Конструктивный элемент</th>
                <th className="col-desc">Назначение / описание</th>
              </tr>
            </thead>
            <tbody>
              <tr data-id="1">
                <td className="col-num">1</td>
                <td className="col-name">Стальная топочная камера</td>
                <td className="col-desc">Место, где происходит сжигание топлива. Окружена водяной рубашкой для отбора тепла.</td>
              </tr>
              <tr data-id="2">
                <td className="col-num">2</td>
                <td className="col-name">Стальной трубчатый теплообменник</td>
                <td className="col-desc">Система труб, по которым проходят дымовые газы, передавая тепловую энергию теплоносителю (воде).</td>
              </tr>
              <tr data-id="3">
                <td className="col-num">3</td>
                <td className="col-name">Чугунная горелка ретортного типа</td>
                <td className="col-desc">Основной узел для сжигания топлива. Топливо подаётся на чашу (реторту), где смешивается с воздухом и горит.</td>
              </tr>
              <tr data-id="4">
                <td className="col-num">4</td>
                <td className="col-name">Зольник</td>
                <td className="col-desc">Ёмкость для сбора золы и шлака, образующихся после сгорания топлива.</td>
              </tr>
              <tr data-id="5">
                <td className="col-num">5</td>
                <td className="col-name">Дверцы (зольника, теплообменника, топочной камеры)</td>
                <td className="col-desc">Обеспечивают доступ для обслуживания, чистки и розжига. Герметично закрываются с помощью уплотнителей.</td>
              </tr>
              <tr data-id="6">
                <td className="col-num">6</td>
                <td className="col-name">Блок управления котла (контроллер)</td>
                <td className="col-desc">Электронное устройство, управляющее подачей топлива, вентилятором и другими процессами в автоматическом режиме.</td>
              </tr>
              <tr data-id="7">
                <td className="col-num">7</td>
                <td className="col-name">Привод шнекового механизма (мотор-редуктор)</td>
                <td className="col-desc">Двигатель, который вращает шнек для подачи топлива из бункера в горелку.</td>
              </tr>
              <tr data-id="8">
                <td className="col-num">8</td>
                <td className="col-name">Наддувной вентилятор</td>
                <td className="col-desc">Нагнетает воздух в горелку для создания избыточного давления и обеспечения интенсивного горения.</td>
              </tr>
              <tr data-id="9">
                <td className="col-num">9</td>
                <td className="col-name">Бункер-накопитель</td>
                <td className="col-desc">Ёмкость для хранения запаса топлива (угля, пеллет), из которого шнек забирает топливо.</td>
              </tr>
              <tr data-id="10">
                <td className="col-num">10</td>
                <td className="col-name">Дымоотвод (дымовой короб)</td>
                <td className="col-desc">Узел для подключения к дымоходу и отвода дымовых газов из котла.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===== ГАЛЕРЕЯ ===== */}
        <div className="gallery-section">
          {/* ЛЕВЫЙ РАЗДЕЛ: ВНЕШНИЙ ВИД */}
          <div className="gallery-card">
            <h3>Внешний вид котла</h3>
            <div className="gallery-grid">
              <div className="gallery-item">
                <div className="placeholder-img">Общий вид</div>
                <span className="badge">фото 1</span>
              </div>
              <div className="gallery-item">
                <div className="placeholder-img">Бункер</div>
                <span className="badge">фото 2</span>
              </div>
              <div className="gallery-item">
                <div className="placeholder-img">Панель управления</div>
                <span className="badge">фото 3</span>
              </div>
              <div className="gallery-item">
                <div className="placeholder-img">Топочная камера</div>
                <span className="badge">фото 4</span>
              </div>
              <div className="gallery-item">
                <div className="placeholder-img">Дымоотвод</div>
                <span className="badge">фото 5</span>
              </div>
              <div className="gallery-item">
                <div className="placeholder-img">Зольник</div>
                <span className="badge">фото 6</span>
              </div>
            </div>
          </div>

          {/* ПРАВЫЙ РАЗДЕЛ: ВНУТРЕННЕЕ УСТРОЙСТВО */}
          <div className="gallery-card">
            <h3>Внутреннее устройство</h3>
            <div className="gallery-grid">
              <div className="gallery-item">
                <img src="https://ufa-akb.ru/upload/iblock/7e2/95gszdgp48h2ucv9he74qpo2ytbrpytb.jpg" alt="Горелка ретортного типа" className="gallery-img"/>
                <span className="badge">фото 7</span>
              </div>
              <div className="gallery-item">
                <img src="https://ufa-akb.ru/upload/iblock/7e2/95gszdgp48h2ucv9he74qpo2ytbrpytb.jpg" alt="Теплообменник" className="gallery-img"/>
                <span className="badge">фото 8</span>
              </div>
              <div className="gallery-item">
                <img src="https://ufa-akb.ru/upload/iblock/7e2/95gszdgp48h2ucv9he74qpo2ytbrpytb.jpg" alt="Шнековый механизм" className="gallery-img"/>
                <span className="badge">фото 9</span>
              </div>
              <div className="gallery-item">
                <img src="https://ufa-akb.ru/upload/iblock/7e2/95gszdgp48h2ucv9he74qpo2ytbrpytb.jpg" alt="Вентилятор наддува" className="gallery-img"/>
                <span className="badge">фото 10</span>
              </div>
              <div className="gallery-item">
                <img src="https://ufa-akb.ru/upload/iblock/7e2/95gszdgp48h2ucv9he74qpo2ytbrpytb.jpg" alt="Контроллер" className="gallery-img"/>
                <span className="badge">фото 11</span>
              </div>
              <div className="gallery-item">
                <img src="https://ufa-akb.ru/upload/iblock/7e2/95gszdgp48h2ucv9he74qpo2ytbrpytb.jpg" alt="Дверца топочной камеры" className="gallery-img"/>
                <span className="badge">фото 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== СХЕМА ОБВЯЗКИ ===== */}
      <section className="min-h-screen flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300" id="schemaTitle">
              Типовая схема обвязки бункерного котла
            </h2>
            <p className="text-lg transition-colors duration-300" id="schemaText">
              ВНИМАНИЕ! При монтаже трубопроводов отопительной сети необходимо предусмотреть установку сбросных кранов для слива теплоносителя.
            </p>
          </div>
          {/* КАРТОЧКА С ФОТО */}
          <div className="testimonial-card rounded-2xl overflow-hidden transition-all duration-300">
            {/* ФОТО */}
            <img
              src="/images/blog/ob.webp"
              alt="Типовая схема обвязки автоматического котла"
              className="w-full h-auto object-cover"
            />

            {/* ПОДПИСЬ ПОД ФОТО */}
            <div className="p-6 md:p-8 border-t transition-all duration-300">
              <p className="text-sm md:text-base font-medium leading-relaxed transition-colors duration-300" id="schemaCaption">
                <span className="font-bold" id="schemaCaptionSpan">Рисунок 11</span> — Типовая схема обвязки автоматического котла.
              </p>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 text-xs md:text-sm transition-colors duration-300" id="schemaList">
                <span><span className="font-semibold">1</span> — котел</span>
                <span><span className="font-semibold">2</span> — клапан предохранительный</span>
                <span><span className="font-semibold">3</span> — электрокотел резервный</span>
                <span><span className="font-semibold">4</span> — блок управления котлом</span>
                <span><span className="font-semibold">5</span> — насос циркуляционный</span>
                <span><span className="font-semibold">6</span> — система рециркуляции</span>
                <span><span className="font-semibold">7</span> — расширительный бак</span>
                <span><span className="font-semibold">8</span> — коллектор распределительный</span>
                <span><span className="font-semibold">9</span> — радиатор</span>
                <span><span className="font-semibold">10</span> — бойлер ГВС</span>
                <span><span className="font-semibold">11</span> — система теплого пола</span>
                <span><span className="font-semibold">12</span> — система регулирования потребителей</span>
                <span><span className="font-semibold">13</span> — датчик температуры обратной линии теплоносителя</span>
                <span><span className="font-semibold">14</span> — датчик мотор-редуктора топливоподачи</span>
                <span><span className="font-semibold">15</span> — датчик вентилятора наддува</span>
                <span><span className="font-semibold">16</span> — датчик температуры системы топливоподачи</span>
                <span><span className="font-semibold">17</span> — датчик температуры подачи теплоносителя</span>
                <span><span className="font-semibold">18</span> — термик</span>
                <span><span className="font-semibold">19</span> — дренаж котла</span>
                <span><span className="font-semibold">20</span> — датчик температуры системы рециркуляции</span>
                <span><span className="font-semibold">21</span> — воздухоотводчик</span>
                <span><span className="font-semibold">22</span> — дренаж системы отопления</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}