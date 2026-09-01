import React from 'react';
import type { Metadata } from 'next';
import Requisites from '@/components/Doc';

export const metadata: Metadata = {
  title: 'Реквизиты — Теплоэнергетика',
  description: 'Юридические и банковские реквизиты компании Теплоэнергетика.',
};

export default function RekvizityPage() {
  return <Requisites />;
}