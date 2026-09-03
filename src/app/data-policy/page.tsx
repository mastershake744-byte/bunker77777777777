import React from 'react';
import type { Metadata } from 'next';
import DataPolicy from '@/components/DataPolicy';
import { SITE_URL } from '@/data/seo';

export const metadata: Metadata = {
  title: 'Правила обработки персональных данных — Теплоэнергетика',
  description: 'Правила обработки персональных данных в соответствии с ФЗ № 152-ФЗ «О персональных данных».',
  alternates: { canonical: `${SITE_URL}/data-policy/` },
  openGraph: {
    title: 'Правила обработки персональных данных | Теплоэнергетика',
    description: 'Правила обработки персональных данных в соответствии с ФЗ № 152-ФЗ «О персональных данных».',
    url: `${SITE_URL}/data-policy/`,
  },
};

export default function DataPolicyPage() {
  return <DataPolicy />;
}