import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { boilersData } from '@/data/products';
import { SITE_URL, SITE_NAME } from '@/data/seo';

const ogImage = `${SITE_URL}/images/og-default.jpg`;

export const metadata: Metadata = {
  title: 'Каталог котлов',
  description: 'Автоматические пеллетные и твердотопливные котлы с бункером. Все модели Vulkan от 11 до 1200 кВт.',
  alternates: { canonical: `${SITE_URL}/product/` },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    title: 'Каталог котлов',
    description: 'Автоматические пеллетные и твердотопливные котлы с бункером. Все модели Vulkan.',
    url: `${SITE_URL}/product/`,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
};

export default function CatalogPage() {
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Каталог котлов',
    url: `${SITE_URL}/product/`,
    inLanguage: 'ru',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: boilersData.length,
      itemListElement: boilersData.slice(0, 100).map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        url: `${SITE_URL}/product/${b.url}`,
      })),
    },
  };

  return (
    <>
      <Script id="product-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />
      <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Каталог котлов</h1>
      <p className="text-gray-400 mb-8">Автоматические пеллетные и твердотопливные котлы с бункером</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boilersData.map((b) => (
          <Link key={b.id} href={`/product/${b.url}/`} className="block border border-gray-700 rounded-xl overflow-hidden hover:border-green-500 transition bg-gray-900">
            <div className="aspect-[4/3] bg-gray-800 flex items-center justify-center p-4 relative">
              {(() => {
                const power = parseInt(b.characteristics.power);
                if (power >= 500) return <span className="product-badge premium">ПРЕМИУМ</span>;
                if (power >= 200) return <span className="product-badge hit">ХИТ</span>;
                if (b.availability === 'в наличии') return <span className="product-badge hit">В наличии</span>;
                return null;
              })()}
              <img src={b.photo} alt={b.name} className="w-full h-full object-contain" loading="lazy" />
            </div>
            <div className="p-5">
            <div className="text-xs text-green-400 uppercase tracking-wide mb-1">{b.razdel}</div>
            <h2 className="text-lg font-semibold leading-snug mb-3">{b.name}</h2>
            <div className="space-y-1 text-sm text-gray-300 mb-4">
              <p>Мощность: <span className="text-white font-medium">{b.characteristics.power}</span></p>
              <p>Площадь: <span className="text-white font-medium">до {(() => { const p = parseInt(b.characteristics.power); return isNaN(p) ? '—' : (p * 10) + ' м²'; })()}</span></p>
              <p>Бункер: <span className="text-white font-medium">{b.characteristics.bunkerVolume}</span></p>
              <p>Вес: <span className="text-white font-medium">{b.characteristics.weight}</span></p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-700 pt-3 mt-auto">
              <span className="text-sm text-gray-400">{b.availability}</span>
              <span className="text-yellow-400 font-semibold text-sm">{b.price}</span>
            </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
    </>
  );
}