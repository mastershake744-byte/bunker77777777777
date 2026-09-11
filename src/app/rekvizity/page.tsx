import React from 'react';
import type { Metadata } from 'next';
import Requisites from '@/components/Doc';
import { SITE_URL } from '@/data/seo';

export const metadata: Metadata = {
  title: 'Реквизиты',
  description: 'Юридические и банковские реквизиты компании Теплоэнергетика.',
  alternates: { canonical: `${SITE_URL}/rekvizity/` },
  openGraph: {
    title: 'Реквизиты',
    description: 'Юридические и банковские реквизиты компании Теплоэнергетика.',
    url: `${SITE_URL}/rekvizity/`,
  },
};

export default function RekvizityPage() {
  return <Requisites />;
}