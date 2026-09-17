'use client';
import React from 'react';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { categories } from '@/data/categories';
import { getTagForProduct } from '@/components/Tags/tags';
import { generatePDFForProduct } from '@/lib/pdf';

export default function ProductView({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = React.useState('specifications');
  const [zoomOpen, setZoomOpen] = React.useState(false);
  const [pdfLoading, setPdfLoading] = React.useState(false);

  const handleDownloadKP = async () => {
    setPdfLoading(true);
    try {
      const pdfBytes = await generatePDFForProduct(product);
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `КП_${product.name.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('PDF generation error:', e);
    }
    setPdfLoading(false);
  };

  const category = categories.find((c) => c.products.includes(product.id));

  return (
    <section className="product-section">
      <nav className="product-breadcrumbs" aria-label="Навигационная цепочка">
        <ol className="breadcrumbs-list">
          <li className="breadcrumb-item">
            <Link href="/" className="breadcrumb-link">Главная</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/product/" className="breadcrumb-link">Каталог</Link>
          </li>
          <li className="breadcrumb-item">
            {category ? (
              <Link href={`/category/${category.url.replace(/\/$/, '')}/`} className="breadcrumb-link">{category.name}</Link>
            ) : (
              <Link href="/catalog" className="breadcrumb-link">{product.razdel}</Link>
            )}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="product-card">
        <div className="product-image-wrap">
          <button className="image-zoom-btn" type="button" onClick={() => setZoomOpen(true)} aria-label="Увеличить">
            <svg viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M16 16L21 21" />
            </svg>
          </button>
          <img id="productMainImage" src={product.photo} className="product-image" alt={product.name} loading="eager" decoding="async" />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

<div className="product-stock-row">
            {getTagForProduct(product) && (
              <Link href={`/tag/${getTagForProduct(product)!.url}/`} className="product-label product-label-power">
                <span className="product-label-power-caption">Метка:</span>
                <span className="product-label-power-value">{getTagForProduct(product)!.name}</span>
              </Link>
            )}
          </div>

          <div className="product-divider"></div>

          <div className="product-specs">
            <div className="product-spec product-spec-location">
              <span>Местоположение</span>
              <strong>{product.sklad || 'Не указан'}</strong>
            </div>
            <div className="product-spec">
              <span>Номинальная мощность</span>
              <strong>{product.characteristics.power}</strong>
            </div>
            <div className="product-spec">
              <span>Объем бункера</span>
              <strong>{product.characteristics.bunkerVolume}</strong>
            </div>
            <div className="product-spec">
              <span>Вес</span>
              <strong>{product.characteristics.weight}</strong>
            </div>
            <div className="product-spec">
              <span>Расход топлива (макс.)</span>
              <strong>{product.characteristics.fuelConsumptionMax}</strong>
            </div>
          </div>

          <div className="product-divider"></div>

          <div className="product-price-row">
            <div>
              <span className="product-price-label">Цена</span>
              <div className="product-price">{product.price}</div>
            </div>
            <span className="product-stock">● {product.availability === 'в наличии' ? 'В наличии' : 'Под заказ'}</span>
          </div>

          <div className="product-actions">
            <button
              className="product-btn product-btn-primary"
              type="button"
              onClick={handleDownloadKP}
              disabled={pdfLoading}
            >{pdfLoading ? 'Формируем PDF…' : 'Получить КП'}</button>
            <a className="product-btn product-btn-secondary" href="#product-tabs">Подробнее</a>
          </div>
        </div>
      </div>

      <div className="product-tabs" id="product-tabs">
        <div className="product-tabs-nav" role="tablist">
          <button
            className={'product-tab-btn' + (activeTab === 'specifications' ? ' active' : '')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'specifications'}
            onClick={() => setActiveTab('specifications')}
          >Технические характеристики</button>
          <button
            className={'product-tab-btn' + (activeTab === 'dimensions' ? ' active' : '')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'dimensions'}
            onClick={() => setActiveTab('dimensions')}
          >Габариты и вес</button>
          <button
            className={'product-tab-btn' + (activeTab === 'fuel' ? ' active' : '')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'fuel'}
            onClick={() => setActiveTab('fuel')}
          >Требования к топливу</button>
          <button
            className={'product-tab-btn' + (activeTab === 'manual' ? ' active' : '')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'manual'}
            onClick={() => setActiveTab('manual')}
          >Документация</button>
        </div>

        {activeTab === 'specifications' && (
          <div className="product-tab-content active" id="specifications" role="tabpanel">
            <div className="spec-row"><span>Номинальная мощность</span><strong>{product.characteristics.power}</strong></div>
            {product.characteristics.thermalPower && product.characteristics.thermalPower !== '—' && (
              <div className="spec-row"><span>Тепловая мощность</span><strong>{product.characteristics.thermalPower}</strong></div>
            )}
            {product.characteristics.efficiency && product.characteristics.efficiency !== '—' && (
              <div className="spec-row"><span>КПД</span><strong>{product.characteristics.efficiency}</strong></div>
            )}
            <div className="spec-row"><span>Объем теплоносителя</span><strong>{product.characteristics.waterVolume}</strong></div>
            <div className="spec-row"><span>Диаметр дымохода</span><strong>{product.characteristics.chimneyDiameter}</strong></div>
            <div className="spec-row"><span>Вес</span><strong>{product.characteristics.weight}</strong></div>
            <div className="spec-row"><span>Объем бункера</span><strong>{product.characteristics.bunkerVolume}</strong></div>
            {product.characteristics.fireboxVolume && product.characteristics.fireboxVolume !== '—' && (
              <div className="spec-row"><span>Объем топочной камеры</span><strong>{product.characteristics.fireboxVolume}</strong></div>
            )}
            {product.characteristics.doorOpeningWidth && product.characteristics.doorOpeningWidth !== '—' && (
              <div className="spec-row"><span>Проем топочной дверцы — ширина</span><strong>{product.characteristics.doorOpeningWidth}</strong></div>
            )}
            {product.characteristics.doorOpeningHeight && product.characteristics.doorOpeningHeight !== '—' && (
              <div className="spec-row"><span>Проем топочной дверцы — высота</span><strong>{product.characteristics.doorOpeningHeight}</strong></div>
            )}
            <div className="spec-row"><span>Расход воды (ном.)</span><strong>{product.characteristics.waterConsumptionNominal}</strong></div>
            <div className="spec-row"><span>Расход воды (мин.)</span><strong>{product.characteristics.waterConsumptionMin}</strong></div>
            <div className="spec-row"><span>Высота дымохода</span><strong>{product.characteristics.chimneyHeight}</strong></div>
            {product.characteristics.recommendedChimneyHeight && product.characteristics.recommendedChimneyHeight !== '—' && (
              <div className="spec-row"><span>Рекомендуемая высота дымовой трубы</span><strong>{product.characteristics.recommendedChimneyHeight}</strong></div>
            )}
            <div className="spec-row"><span>Диаметр патрубка</span><strong>{product.characteristics.pipeDiameter}</strong></div>
            {product.characteristics.workingPressure && product.characteristics.workingPressure !== '—' && (
              <div className="spec-row"><span>Рабочее давление</span><strong>{product.characteristics.workingPressure}</strong></div>
            )}
            <div className="spec-row"><span>Рабочая температура</span><strong>{product.characteristics.workingTemperature}</strong></div>
            <div className="spec-row"><span>Макс. температура</span><strong>{product.characteristics.maxTemperature}</strong></div>
            <div className="spec-row"><span>Давление клапана</span><strong>{product.characteristics.valvePressure}</strong></div>
            <div className="spec-row"><span>Температура дым. газов</span><strong>{product.characteristics.flueGasTemperature}</strong></div>
            <div className="spec-row"><span>Расход топлива (макс.)</span><strong>{product.characteristics.fuelConsumptionMax}</strong></div>
            <div className="spec-row"><span>Расход топлива (ном.)</span><strong>{product.characteristics.fuelConsumptionNominal}</strong></div>
            {product.characteristics.heatedArea && product.characteristics.heatedArea !== '—' && (
              <div className="spec-row"><span>Отапливаемая площадь</span><strong>{product.characteristics.heatedArea}</strong></div>
            )}
            {product.characteristics.burnerType && product.characteristics.burnerType !== '—' && (
              <div className="spec-row"><span>Тип горелки</span><strong>{product.characteristics.burnerType}</strong></div>
            )}
            {product.characteristics.controller && product.characteristics.controller !== '—' && (
              <div className="spec-row"><span>Контроллер</span><strong>{product.characteristics.controller}</strong></div>
            )}
            {product.characteristics.fuelType && product.characteristics.fuelType !== '—' && (
              <div className="spec-row"><span>Тип топлива</span><strong>{product.characteristics.fuelType}</strong></div>
            )}
            {product.characteristics.connectionPipes && product.characteristics.connectionPipes !== '—' && (
              <div className="spec-row"><span>Патрубки (под./обр.)</span><strong>{product.characteristics.connectionPipes}</strong></div>
            )}
            {product.characteristics.drainPipes && product.characteristics.drainPipes !== '—' && (
              <div className="spec-row"><span>Спускные патрубки</span><strong>{product.characteristics.drainPipes}</strong></div>
            )}
            {product.characteristics.boilerDraft && product.characteristics.boilerDraft !== '—' && (
              <div className="spec-row"><span>Разряжение за котлом</span><strong>{product.characteristics.boilerDraft}</strong></div>
            )}
            {product.characteristics.heatingSurfaceArea && product.characteristics.heatingSurfaceArea !== '—' && (
              <div className="spec-row"><span>Площадь нагрева</span><strong>{product.characteristics.heatingSurfaceArea}</strong></div>
            )}
            {product.characteristics.fuelFraction && product.characteristics.fuelFraction !== '—' && (
              <div className="spec-row"><span>Фракция топлива</span><strong>{product.characteristics.fuelFraction}</strong></div>
            )}
            {product.characteristics.minReturnTemperature && product.characteristics.minReturnTemperature !== '—' && (
              <div className="spec-row"><span>Мин. температура обратки</span><strong>{product.characteristics.minReturnTemperature}</strong></div>
            )}
            {product.characteristics.powerSupply && product.characteristics.powerSupply !== '—' && (
              <div className="spec-row"><span>Электропитание</span><strong>{product.characteristics.powerSupply}</strong></div>
            )}
            {product.characteristics.serviceLife && product.characteristics.serviceLife !== '—' && (
              <div className="spec-row"><span>Срок службы</span><strong>{product.characteristics.serviceLife}</strong></div>
            )}
            {product.characteristics.boilerMass && product.characteristics.boilerMass !== '—' && (
              <div className="spec-row"><span>Масса с горелкой (без бункера)</span><strong>{product.characteristics.boilerMass}</strong></div>
            )}
          </div>
        )}

        {activeTab === 'dimensions' && (
          <div className="product-tab-content active" id="dimensions" role="tabpanel">
            <div className="dimension-grid">
              <div className="dimension-item">
                <span>Вес</span>
                <strong>{product.characteristics.weight}</strong>
              </div>
              <div className="dimension-item">
                <span>Ширина</span>
                <strong>{product.razmer.width} {product.razmer.unit}</strong>
              </div>
              <div className="dimension-item">
                <span>Высота</span>
                <strong>{product.razmer.height} {product.razmer.unit}</strong>
              </div>
              <div className="dimension-item">
                <span>Глубина</span>
                <strong>{product.razmer.depth} {product.razmer.unit}</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fuel' && (
          <div className="product-tab-content active" id="fuel" role="tabpanel">
            <h3 style={{ color: 'var(--text)', marginBottom: 16, fontSize: 18 }}>Основное топливо</h3>
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ color: 'var(--text)', fontSize: 15, marginBottom: 8 }}>Бурый уголь (фракционный)</h4>
              <div className="spec-row"><span>Фракция</span><strong>Семечка 5-25 мм / Горошек 5-30 мм / Орех 10-55 мм</strong></div>
              <div className="spec-row"><span>Теплотворность</span><strong>4 920 — 6 200 ккал/кг</strong></div>
              <div className="spec-row"><span>Влажность</span><strong>≤ 15 — 22.6 %</strong></div>
              <div className="spec-row"><span>Зольность</span><strong>≤ 10 %</strong></div>
              <div className="spec-row"><span>Выход летучих веществ</span><strong>28-48 %</strong></div>
              <div className="spec-row"><span>Содержание серы</span><strong>≤ 0.6 %</strong></div>
            </div>
            <div>
              <h4 style={{ color: 'var(--text)', fontSize: 15, marginBottom: 8 }}>Древесные пеллеты</h4>
              <div className="spec-row"><span>Диаметр</span><strong>4-9 мм</strong></div>
              <div className="spec-row"><span>Длина</span><strong>3.15-40 мм</strong></div>
              <div className="spec-row"><span>Теплотворность</span><strong>3 940 — 4 540 ккал/кг</strong></div>
              <div className="spec-row"><span>Влажность</span><strong>≤ 10 %</strong></div>
              <div className="spec-row"><span>Зольность</span><strong>≤ 0.7 %</strong></div>
              <div className="spec-row"><span>Плотность</span><strong>≥ 650 кг/м³</strong></div>
            </div>
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="product-tab-content active" id="manual" role="tabpanel">
            <div className="manual-box">
              <div className="manual-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M6 2h9l4 4v16H6z" />
                  <path d="M14 2v5h5" />
                  <path d="M9 13h6M9 17h6" />
                </svg>
              </div>
              <div className="manual-info">
                <strong>{product.pdfName || 'Паспорт и руководство по эксплуатации'}</strong>
                <span>PDF • Скачать документ</span>
              </div>
              <a href={product.documents} className="manual-download" target="_blank" download>Скачать PDF</a>
            </div>
          </div>
        )}
      </div>

      <div className="product-screenshot-section">
        <h3 className="marketing-h3 text-[80%]">Фото габаритных размеров {product.name}</h3>
        <div className="screenshot-grid">
          {product.screenshot && product.screenshot.length > 0 ? (
            <>
              {product.screenshot.map((src, i) => (
                <div className="screenshot-item" key={i}>
                  <div className="marketing-img-wrap">
                    <img src={src} alt={`Габаритные размеры ${product.name}`} className="marketing-video" />
                  </div>
                </div>
              ))}
              {product.video && (
                <div className="screenshot-item">
                  <iframe
                    width="100%"
                    height="100%"
                    src={product.video}
                    style={{ border: 'none', borderRadius: '12px', aspectRatio: '16/9' }}
                    allow="clipboard-write; autoplay"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </>
          ) : (
            <div className="video-item">
              <video autoPlay loop muted playsInline preload="metadata" disablePictureInPicture className="marketing-video">
                <source src="https://modal-cdn.com/pricing/Modal_Graph_Mobile-Right_250501_v01.hevc.mp4" type="video/mp4" />
                <source src="https://modal-cdn.com/pricing/Modal_Graph_Mobile-Right_250501_v01.webm" type="video/webm" />
              </video>
              <h4 className="video-title">Экономия до 30% на отоплении</h4>
              <p>По сравнению с газом и дизельным топливом</p>
            </div>
          )}
        </div>
      </div>

      {zoomOpen && (
        <div className="product-zoom-modal active" id="productZoom" role="dialog" aria-modal="true" onClick={() => setZoomOpen(false)}>
          <button className="zoom-close-btn" type="button" onClick={() => setZoomOpen(false)} aria-label="Закрыть">&times;</button>
          <img id="zoomImage" src={product.photo} alt="Увеличенное изображение" />
        </div>
      )}
    </section>
  );
}