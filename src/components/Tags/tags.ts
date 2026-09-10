import { boilersData } from '@/data/products';
import type { Product } from '@/data/products';

export interface ProductTag {
  /** URL-сегмент, например "kvt-15" */
  url: string;
  /** Имя метки, например "15 кВт" */
  name: string;
  /** Точная мощность, кВт */
  power: number;
}

/**
 * Нормализация мощности к числу. Для диапазонов ("12-150 кВт")
 * берётся максимальное значение (150). Для "по запросу"/"—" — null.
 */
export function normalizePower(p: string): number | null {
  const nums = p.match(/\d+/g);
  if (!nums || nums.length === 0) return null;
  return Math.max(...nums.map(Number));
}

/** Все метки: уникальные значения мощности из каталога */
export const allTags: ProductTag[] = (() => {
  const map = new Map<number, ProductTag>();
  for (const b of boilersData) {
    const power = normalizePower(b.characteristics.power);
    if (power === null) continue;
    if (!map.has(power)) {
      map.set(power, { url: `kvt-${power}`, name: `${power} кВт`, power });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.power - b.power);
})();

/** Метка для конкретного товара */
export function getTagForProduct(product: Product): ProductTag | undefined {
  const power = normalizePower(product.characteristics.power);
  if (power === null) return undefined;
  return allTags.find((t) => t.power === power);
}

export function getTagByUrl(url: string): ProductTag | undefined {
  return allTags.find((t) => t.url === url.replace(/\/$/, ''));
}

/** Все товары с данной мощностью */
export function getProductsByTag(tag: ProductTag): Product[] {
  return boilersData.filter((b) => normalizePower(b.characteristics.power) === tag.power);
}