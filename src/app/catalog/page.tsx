import type { Metadata } from 'next';
import { SITE_URL } from '@/data/seo';
import CatalogPageContent from './CatalogContent';

export const metadata: Metadata = {
  title: 'Каталог твёрдотопливных и пеллетных котлов',
  description: 'Автоматические и полуавтоматические котлы на пеллетах, угле и дровах. От 11 до 1200 кВт. Работаем с НДС.',
  alternates: { canonical: `${SITE_URL}/catalog` },
  openGraph: {
    title: 'Каталог твёрдотопливных и пеллетных котлов | Теплоэнергетика',
    description: 'Автоматические и полуавтоматические котлы на пеллетах, угле и дровах. От 11 до 1200 кВт.',
    url: `${SITE_URL}/catalog`,
  },
};

export default function CatalogPage() {
  return <CatalogPageContent />;
}