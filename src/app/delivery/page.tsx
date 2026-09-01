import React from 'react';
import type { Metadata } from 'next';
import DeliveryCalculator from '@/components/Deliver';

export const metadata: Metadata = {
  title: 'Конфигуратор доставки — Теплоэнергетика',
  description: 'Калькулятор стоимости доставки котлов и оборудования. Расчёт по весу, габаритам и расстоянию по тарифам Деловых Линий.',
};

export default function DeliveryPage() {
  return <DeliveryCalculator />;
}