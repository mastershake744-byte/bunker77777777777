import React from 'react';
import type { Metadata } from 'next';
import DeliveryCalculator from '@/components/Deliver';
import { SITE_URL } from '@/data/seo';

export const metadata: Metadata = {
  title: 'Конфигуратор доставки — Теплоэнергетика',
  description: 'Калькулятор стоимости доставки котлов и оборудования. Расчёт по весу, габаритам и расстоянию по тарифам Деловых Линий.',
  alternates: { canonical: `${SITE_URL}/delivery/` },
  openGraph: {
    title: 'Конфигуратор доставки | Теплоэнергетика',
    description: 'Калькулятор стоимости доставки котлов и оборудования. Расчёт по весу, габаритам и расстоянию.',
    url: `${SITE_URL}/delivery/`,
  },
};

export default function DeliveryPage() {
  return <DeliveryCalculator />;
}