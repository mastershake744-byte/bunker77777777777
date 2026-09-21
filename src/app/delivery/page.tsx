import React from 'react';
import type { Metadata } from 'next';
import DeliveryCalculator from '@/components/Deliver';
import { SITE_URL } from '@/data/seo';

export const metadata: Metadata = {
title: 'Расчёт доставки пеллетного котла - Теплоэнергетика',
    description: 'Доставка пеллетного котла с автоматической подачей с бункером. Доставка котлы длительного горения.',
    alternates: { canonical: `${SITE_URL}/delivery/` },
    openGraph: {
    title: 'Расчёт доставки пеллетного котла - Теплоэнергетика',
    description: 'Доставка пеллетного котла с автоматической подачей с бункером. Доставка котлы длительного горения.',
    url: `${SITE_URL}/delivery/`,
  },
};

export default function DeliveryPage() {
  return <DeliveryCalculator />;
}