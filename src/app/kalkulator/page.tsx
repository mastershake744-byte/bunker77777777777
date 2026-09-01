import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import FuelCalc from '@/components/kalkulator';

export const metadata: Metadata = {
  title: 'Калькулятор расхода топлива — Теплоэнергетика',
  description: 'Рассчитайте расход пеллет, угля и другого твёрдого топлива для отопления вашего дома.',
};

export default function CalcPage() {
  return (
    <>
      <FuelCalc />
      <Script src="/scripts/fuel-calc.js" strategy="afterInteractive" />
    </>
  );
}