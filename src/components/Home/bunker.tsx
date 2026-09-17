import React from 'react';

export default function BunkerInfo() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="page-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Автоматические котлы с бункерами</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Автоматические твердотопливные котлы с бункером — это современное решение для отопления,
            не требующее постоянного присутствия человека. Бункер-накопитель обеспечивает автономную
            работу котла на протяжении нескольких дней. Чем больше объём бункера, тем реже требуется
            его загрузка. Ниже приведены рекомендуемые объёмы бункера и периодичность загрузки для
            различных моделей.
          </p>
        </div>

        <div className="table-wrap">
          <table className="full-table">
            <thead>
              <tr>
                <th className="col-num">№</th>
                <th className="col-name">Объём бункера, л</th>
                <th className="col-desc">Периодичность загрузки</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-num">1</td>
                <td className="col-name">300</td>
                <td className="col-desc">раз в 3 дня</td>
              </tr>
              <tr>
                <td className="col-num">2</td>
                <td className="col-name">500</td>
                <td className="col-desc">раз в 4–5 дней</td>
              </tr>
              <tr>
                <td className="col-num">3</td>
                <td className="col-name">750</td>
                <td className="col-desc">раз в 5–7 дней</td>
              </tr>
              <tr>
                <td className="col-num">4</td>
                <td className="col-name">1000</td>
                <td className="col-desc">раз в 7–9 дней</td>
              </tr>
              <tr>
                <td className="col-num">5</td>
                <td className="col-name">1200</td>
                <td className="col-desc">раз в 9–12 дней</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-center mt-6 opacity-70">
          * Периодичность загрузки указана ориентировочно и зависит от мощности котла, температуры теплоносителя и теплопотерь помещения.
        </p>
      </div>
    </section>
  );
}