import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import FuelCalc from '@/components/kalkulator';
import { SITE_URL } from '@/data/seo';

export const metadata: Metadata = {
  title: 'Калькулятор расхода топлива',
  description: 'Рассчитайте расход пеллет, угля и другого твёрдого топлива для отопления вашего дома.',
  alternates: { canonical: `${SITE_URL}/kalkulator/` },
  openGraph: {
    title: 'Калькулятор расхода топлива',
    description: 'Рассчитайте расход пеллет, угля и другого твёрдого топлива для отопления вашего дома.',
    url: `${SITE_URL}/kalkulator/`,
  },
};

export default function CalcPage() {
  return (
    <>
      <FuelCalc />
      <Script src="/scripts/fuel-calc.js" strategy="afterInteractive" />
    </>
  );
}