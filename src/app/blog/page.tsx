import type { Metadata } from 'next';
import BlogList from '@/components/Blog/BlogList';
import { SITE_URL } from '@/data/seo';

export const metadata: Metadata = {
  title: 'Тепловое оборудование для пеллет | Статьи | Теплоэнергетика',
  description: 'Обзоры пеллетных горелок, котлов и теплового оборудования для пеллет. Полезные статьи и рекомендации от специалистов.',
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    title: 'Тепловое оборудование для пеллет | Теплоэнергетика',
    description: 'Статьи о пеллетных горелках, котлах и оборудовании для пеллетного отопления.',
    url: `${SITE_URL}/blog/`,
  },
};

export default function BlogPage() {
  return <BlogList page={1} />;
}