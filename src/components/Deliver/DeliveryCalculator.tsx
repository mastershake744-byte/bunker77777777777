// ===========================================================================
//  Калькулятор доставки — аналог Деловых Линий
//  Расчёт стоимости доставки по весу, габаритам (Д×Ш×В в см), расстоянию (км)
//  и цене дизельного топлива (₽/литр). Использует тарифную сетку Деловых Линий.
// ===========================================================================

'use client';

import React, { useState } from 'react';
// import { motion } from 'framer-motion'; // Отключено: библиотека не установлена

interface DeliveryResult {
  cost: number;
  breakdown: {
    baseRate: number;
    baseCost: number;
    weightSurcharge: number;
    dimensionSurcharge: number;
    distanceSurcharge: number;
    fuelSurcharge: number;
    total: number;
  };
}

// Тарифная сетка Деловых Линий (упрощённая, для примера)
// Базовая ставка за км в зависимости от веса
const BASE_RATES_PER_KM = [
  { maxWeight: 10, rate: 18 },    // до 10 кг
  { maxWeight: 30, rate: 15 },    // 10-30 кг
  { maxWeight: 100, rate: 12 },   // 30-100 кг
  { maxWeight: 500, rate: 9 },    // 100-500 кг
  { maxWeight: 1000, rate: 7 },   // 500-1000 кг
  { maxWeight: Infinity, rate: 5 } // свыше 1000 кг
];

// Надбавка за негабарит (если сумма габаритов > 300 см или любая сторона > 120 см)
const OVERSIZE_SURCHARGE = 0.25; // +25%

// Надбавка за плотность (если объёмный вес > фактический)
const VOLUMETRIC_FACTOR = 5000; // см³/кг (стандарт Деловых Линий)

// Минимальная стоимость доставки
const MIN_DELIVERY_COST = 500;

export default function DeliveryCalculator() {
  const [weight, setWeight] = useState(100); // кг
  const [length, setLength] = useState(100); // см
  const [width, setWidth] = useState(80);    // см
  const [height, setHeight] = useState(60);  // см
  const [distance, setDistance] = useState(500); // км
  const [fuelPrice, setFuelPrice] = useState(62); // ₽/литр
  const [result, setResult] = useState<DeliveryResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateDelivery = () => {
    setLoading(true);
    
    // Расчёт объёмного веса
    const volume = length * width * height; // см³
    const volumetricWeight = volume / VOLUMETRIC_FACTOR; // кг
    const chargeableWeight = Math.max(weight, volumetricWeight);

    // Базовая ставка
    const baseRate = BASE_RATES_PER_KM.find(rate => chargeableWeight <= rate.maxWeight)!.rate;
    const baseCost = baseRate * distance;

    // Надбавка за вес (если > 1000 кг)
    const weightSurcharge = chargeableWeight > 1000 ? baseCost * 0.15 : 0;

    // Надбавка за габариты
    const totalDimensions = length + width + height;
    const maxDimension = Math.max(length, width, height);
    const dimensionSurcharge = 
      totalDimensions > 300 || maxDimension > 120 ? baseCost * OVERSIZE_SURCHARGE : 0;

    // Надбавка за расстояние (если > 2000 км)
    const distanceSurcharge = distance > 2000 ? baseCost * 0.1 : 0;

    // Топливная надбавка (зависит от цены дизеля)
    const baseFuelPrice = 55; // базовая цена дизеля, ₽/литр
    const fuelMultiplier = fuelPrice > baseFuelPrice 
      ? 1 + (fuelPrice - baseFuelPrice) * 0.005 // +0.5% за каждый рубль сверх базы
      : 1;
    const fuelSurcharge = (baseCost + weightSurcharge + dimensionSurcharge + distanceSurcharge) * (fuelMultiplier - 1);

    // Итог
    const subtotal = baseCost + weightSurcharge + dimensionSurcharge + distanceSurcharge + fuelSurcharge;
    const total = Math.max(subtotal, MIN_DELIVERY_COST);

    setResult({
      cost: Math.round(total),
      breakdown: {
        baseRate,
        baseCost: Math.round(baseCost),
        weightSurcharge: Math.round(weightSurcharge),
        dimensionSurcharge: Math.round(dimensionSurcharge),
        distanceSurcharge: Math.round(distanceSurcharge),
        fuelSurcharge: Math.round(fuelSurcharge),
        total: Math.round(total)
      }
    });
    setLoading(false);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
  };

  return (
    <section className="delivery-calculator">
      <div className="container">
        <h2 className="calculator-title">Калькулятор доставки</h2>
        <p className="calculator-subtitle">Расчёт по тарифам Деловых Линий</p>

        <div className="calculator-grid">
          {/* Форма ввода */}
          <div className="calculator-form">
            <div className="form-group">
              <label>Вес груза, кг</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min={1}
                step={1}
                placeholder="Например: 100"
              />
            </div>

            <div className="dimensions-group">
              <div className="form-group">
                <label>Длина, см</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  min={1}
                  step={1}
                  placeholder="100"
                />
              </div>
              <div className="form-group">
                <label>Ширина, см</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min={1}
                  step={1}
                  placeholder="80"
                />
              </div>
              <div className="form-group">
                <label>Высота, см</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={1}
                  step={1}
                  placeholder="60"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Расстояние, км</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                min={1}
                step={1}
                placeholder="Например: 500"
              />
            </div>

            <div className="form-group">
              <label>Цена дизеля, ₽/литр</label>
              <input
                type="number"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                min={40}
                max={100}
                step={0.5}
                placeholder="62"
              />
              <small className="hint">Текущая средняя цена по России</small>
            </div>

            <button 
              className="calculate-btn"
              onClick={calculateDelivery}
              disabled={loading}
            >
              {loading ? 'Расчёт...' : 'Рассчитать стоимость'}
            </button>
          </div>

          {/* Результаты */}
          {result && (
      <div className="calculator-result">
        <h3>Итого к оплате</h3>
        <div className="result-amount">
          {formatCurrency(result.cost)}
        </div>

        <div className="breakdown">
          <div className="breakdown-item">
            <span>Базовая ставка ({result.breakdown.baseRate} ₽/км × {distance} км)</span>
            <strong>{formatCurrency(result.breakdown.baseCost)}</strong>
          </div>

          {result.breakdown.weightSurcharge > 0 && (
            <div className="breakdown-item">
              <span>Надбавка за вес</span>
              <strong>{formatCurrency(result.breakdown.weightSurcharge)}</strong>
            </div>
          )}

          {result.breakdown.dimensionSurcharge > 0 && (
            <div className="breakdown-item">
              <span>Надбавка за габариты</span>
              <strong>{formatCurrency(result.breakdown.dimensionSurcharge)}</strong>
            </div>
          )}

          {result.breakdown.distanceSurcharge > 0 && (
            <div className="breakdown-item">
              <span>Надбавка за расстояние</span>
              <strong>{formatCurrency(result.breakdown.distanceSurcharge)}</strong>
            </div>
          )}

          <div className="breakdown-item">
            <span>Топливная надбавка</span>
            <strong>{formatCurrency(result.breakdown.fuelSurcharge)}</strong>
          </div>

          <div className="breakdown-total">
            <span>Итого</span>
            <strong>{formatCurrency(result.breakdown.total)}</strong>
          </div>
        </div>

        <div className="details">
          <h4>Детали расчёта</h4>
          <div className="detail-row">
            <span>Расчётный вес:</span>
            <strong>{Math.ceil(Math.max(weight, (length * width * height) / 5000))} кг</strong>
          </div>
          <div className="detail-row">
            <span>Объёмный вес:</span>
            <strong>{Math.ceil((length * width * height) / 5000)} кг</strong>
          </div>
          <div className="detail-row">
            <span>Габариты:</span>
            <strong>{length}×{width}×{height} см</strong>
          </div>
          <div className="detail-row">
            <span>Сумма габаритов:</span>
            <strong>{length + width + height} см</strong>
          </div>
        </div>
      </div>
          )}
        </div>

        <div className="calculator-notes">
          <h4>Примечания</h4>
          <ul>
            <li>Расчёт ориентировочный, точная стоимость — после замера на терминале</li>
            <li>Минимальная стоимость доставки: {formatCurrency(MIN_DELIVERY_COST)}</li>
            <li>Тарифы актуальны на 2026 год, могут меняться</li>
            <li>Для негабаритных грузов ({'>'}300 см сумма или {'>'}120 см сторона) применяется надбавка 25%</li>
            <li>Топливная надбавка пересчитывается ежедневно</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
