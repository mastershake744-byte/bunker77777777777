export interface Article {
  id: number;
  name: string;
  url: string;
  photo: string;
  text: string;
  seo_title: string;
  seo_description: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: 7,
    name: 'Факельные пеллетные горелки Bizon: обзор и характеристики',
    url: 'gorelki-bizon/',
    photo: '/images/product/categories/gorelki/bizon.webp',
    text: 'Факельные пеллетные горелки Bizon — надёжное решение для автоматизации твердотопливных котлов. В статье рассмотрены модельный ряд, мощность от 20 до 500 кВт, особенности конструкции, система розжига и управления. Сравнение с другими типами горелок.',
    seo_title: 'Факельные пеллетные горелки Bizon — обзор | Теплоэнергетика',
    seo_description: 'Обзор факельных пеллетных горелок Bizon: мощность, конструкция, управление. Для автоматизации котлов от 20 до 500 кВт.',
    tags: ['пеллетные горелки', 'Bizon', 'автоматизация'],
  },
];