// ============================================================================
//  Динамическая страница товара
//  Каждый товар из boilersData (src/data/products.ts) получает страницу
//  по адресу /product/{url}/ — где url уникален для каждого товара.
//  При сборке generateStaticParams() создаёт все страницы статически.
// ============================================================================

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { boilersData, getBoilerByUrl } from '@/data/products';
import ProductView from '@/components/Product';

export function generateStaticParams() {
  // Убираем trailing slash из url для корректного matching в Next.js
  return boilersData.map((p) => ({ url: p.url.replace(/\/$/, '') }));
}

export function generateMetadata({ params }: { params: { url: string } }): Metadata {
  const product = getBoilerByUrl(params.url);
  if (!product) return {};
  return {
    title: `${product.name} — цена ${product.price} | Теплоэнергетика`,
    description: `${product.name}. Мощность ${product.characteristics.power}, объём бункера ${product.characteristics.bunkerVolume}, вес ${product.characteristics.weight}.`,
  };
}

export default function ProductPage({ params }: { params: { url: string } }) {
  const product = getBoilerByUrl(params.url);
  if (!product) notFound();

  return <ProductView product={product} />;
}