import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { boilersData, getBoilerByUrl } from '@/data/products';
import { categories } from '@/data/categories';
import { SITE_URL, SITE_NAME } from '@/data/seo';
import ProductView from '@/components/Product';

export function generateStaticParams() {
  return boilersData.map((p) => ({ url: p.url.replace(/\/$/, '') }));
}

export function generateMetadata({ params }: { params: { url: string } }): Metadata {
  const product = getBoilerByUrl(params.url);
  if (!product) return {};
  const canonical = `${SITE_URL}/product/${params.url}/`;
  const ogImage = product.photo.startsWith('http') ? product.photo : `${SITE_URL}${product.photo}`;
  return {
    title: `${product.name} — цена ${product.price}`,
    description: `${product.name}. Мощность ${product.characteristics.power}, объём бункера ${product.characteristics.bunkerVolume}, вес ${product.characteristics.weight}.`,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} — цена ${product.price}`,
      description: `${product.name}. Мощность ${product.characteristics.power} кВт, бункер ${product.characteristics.bunkerVolume} л, вес ${product.characteristics.weight} кг.`,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'ru_RU',
      images: [{ url: ogImage, width: 800, height: 800 }],
    },
  };
}

export default function ProductPage({ params }: { params: { url: string } }) {
  const product = getBoilerByUrl(params.url);
  if (!product) notFound();

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.photo.startsWith('http') ? product.photo : `${SITE_URL}${product.photo}`,
    description: `${product.name}. Мощность ${product.characteristics.power} кВт, бункер ${product.characteristics.bunkerVolume} л, вес ${product.characteristics.weight} кг.`,
    sku: `VULKAN-${product.id}`,
    brand: { '@type': 'Brand', name: 'Вулкан' },
    itemCondition: 'https://schema.org/NewCondition',
    offers: {
      '@type': 'Offer',
      price: product.price.replace(/[^\d]/g, ''),
      priceCurrency: 'RUB',
      availability: product.availability === 'в наличии' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      url: `${SITE_URL}/product/${params.url}/`,
    },
  };

  const category = categories.find((c) => c.products.includes(product.id));
  const breadParts = category
    ? [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${SITE_URL}/catalog` },
        { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_URL}/category/${category.url.replace(/\/$/, '')}/` },
        { '@type': 'ListItem', position: 4, name: product.name, item: `${SITE_URL}/product/${params.url}/` },
      ]
    : [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Магазин', item: `${SITE_URL}/shop/` },
        { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/product/${params.url}/` },
      ];

  const breadSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadParts,
  };

  return (
    <>
      <Script id="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Script id="product-breadcrumbs-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadSchema) }} />
      <ProductView product={product} />
    </>
  );
}