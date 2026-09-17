import { PDFDocument, PDFFont, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { SITE_NAME, ORG_PHONE } from '@/data/seo';
import type { Product } from '@/data/products';

const RED = rgb(0.8, 0.15, 0.15);
const DARK = rgb(0.15, 0.15, 0.15);
const GRAY = rgb(0.4, 0.4, 0.4);
const LIGHT = rgb(0.95, 0.95, 0.95);
const WHITE = rgb(1, 1, 1);

const EMAIL = 'rdv@teplo-en.ru';

let cachedFont: ArrayBuffer | null = null;

async function getFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont;
  try {
    const res = await fetch('/fonts/arial.ttf');
    cachedFont = await res.arrayBuffer();
  } catch {
    return new ArrayBuffer(0);
  }
  return cachedFont;
}

function plural(n: number, forms: [string, string, string]): string {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return forms[1];
  return forms[2];
}

function three(n: number, fem: boolean): string {
  const unitsM = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  const unitsF = ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
  const tens = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  if (h) parts.push(hundreds[h]);
  const rem = n % 100;
  if (rem >= 10 && rem <= 19) { parts.push(teens[rem - 10]); }
  else { const t = Math.floor(rem / 10); if (t) parts.push(tens[t]); const o = rem % 10; if (o) parts.push(fem ? unitsF[o] : unitsM[o]); }
  return parts.join(' ');
}

function rublesInWords(n: number): string {
  if (n === 0) return 'ноль';
  const rub = Math.floor(n);
  const words: string[] = [];
  const milliards = Math.floor(rub / 1e9);
  const millions = Math.floor((rub % 1e9) / 1e6);
  const thousands = Math.floor((rub % 1e6) / 1000);
  const rest = rub % 1000;
  if (milliards) words.push(three(milliards, false) + ' ' + plural(milliards, ['миллиард', 'миллиарда', 'миллиардов']));
  if (millions) words.push(three(millions, false) + ' ' + plural(millions, ['миллион', 'миллиона', 'миллионов']));
  if (thousands) words.push(three(thousands, true) + ' ' + plural(thousands, ['тысяча', 'тысячи', 'тысяч']));
  if (rest) words.push(three(rest, false));
  let res = words.join(' ') + ' ' + plural(rub, ['рубль', 'рубля', 'рублей']);
  return res.charAt(0).toUpperCase() + res.slice(1);
}

function priceInWords(n: number): string {
  const rub = Math.floor(n);
  const kop = Math.round((n - rub) * 100);
  return rublesInWords(rub) + ' ' + String(kop).padStart(2, '0') + ' ' + plural(kop, ['копейка', 'копейки', 'копеек']);
}

function parsePrice(price: string): number {
  const digits = price.replace(/[^\d]/g, '').replace(/^0+/, '');
  return digits ? parseInt(digits, 10) : 0;
}

function formatPriceKop(n: number): string {
  const rub = Math.floor(n);
  const kop = Math.round((n - rub) * 100);
  return rub.toLocaleString('ru-RU') + ',' + String(kop).padStart(2, '0') + ' ₽';
}

async function imageToPng(src: string): Promise<Uint8Array | null> {
  try {
    const img = new Image();
    img.src = src;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('img load failed'));
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    const base64 = dataUrl.split(',')[1];
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  } catch { return null; }
}

export async function generatePDFForProduct(product: Product): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = await getFont();
  const font: PDFFont = fontBytes.byteLength > 0
    ? await pdfDoc.embedFont(fontBytes, { subset: true })
    : await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([595, 842]);
  const { width } = page.getSize();
  const margin = 50;

  // ══════════ ШАПКА ══════════
  page.drawText(SITE_NAME, { x: margin, y: 800, size: 20, font, color: DARK });
  page.drawText(`${ORG_PHONE}  •  e-mail: ${EMAIL}`, { x: margin, y: 778, size: 12, font, color: GRAY });
  const kpLabel = 'КП (коммерческое предложение)';
  page.drawText(kpLabel, { x: width - margin - font.widthOfTextAtSize(kpLabel, 11), y: 796, size: 11, font, color: GRAY });

  // ══════════ КРАСНАЯ ЛИНИЯ ══════════
  page.drawLine({ start: { x: margin, y: 756 }, end: { x: width - margin, y: 756 }, thickness: 2.5, color: RED });

  // ══════════ ФОТО ══════════
  let cursor = 738;
  let hasPhoto = false;
  const photoPng = await imageToPng(product.photo);
  if (photoPng && photoPng.byteLength > 0) {
    try {
      const img = await pdfDoc.embedPng(photoPng);
      const maxW = 250;
      const maxH = 150;
      const scale = Math.min(maxW / img.width, maxH / img.height, 1);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (width - dw) / 2;
      const dy = 734 - dh;
      page.drawImage(img, { x: dx, y: dy, width: dw, height: dh });
      cursor = dy - 22;
      hasPhoto = true;
    } catch { /* ignore */ }
  }
  if (!hasPhoto) {
    page.drawText('Фото товара', { x: width / 2 - 40, y: 690, size: 14, font, color: GRAY });
    cursor = 660;
  }

  // ══════════ НАЗВАНИЕ ══════════
  const titleSize = Math.min(19, Math.max(12, 430 / product.name.length * 2));
  page.drawText(product.name, { x: (width - font.widthOfTextAtSize(product.name, titleSize)) / 2, y: cursor, size: titleSize, font, color: DARK });
  cursor -= 22;

  // ══════════ ТАБЛИЦА ХАРАКТЕРИСТИК ══════════
  const specs: [string, string][] = [
    ['Номинальная мощность', product.characteristics.power],
    ['Тепловая мощность', product.characteristics.thermalPower || '—'],
    ['Объём бункера', product.characteristics.bunkerVolume],
    ['Вес', product.characteristics.weight],
    ['Диаметр дымохода', product.characteristics.chimneyDiameter],
    ['Расход топлива (макс.)', product.characteristics.fuelConsumptionMax],
    ['КПД', product.characteristics.efficiency || '—'],
  ];

  const tX = margin;
  const tW = width - margin * 2;
  const col1W = tW * 0.5;
  const rowH = 19;
  const headerH = 22;

  page.drawRectangle({ x: tX, y: cursor - headerH, width: tW, height: headerH, color: DARK });
  page.drawText('Характеристика', { x: tX + 10, y: cursor - headerH + 6, size: 10, font, color: WHITE });
  page.drawText('Значение', { x: tX + col1W + 10, y: cursor - headerH + 6, size: 10, font, color: WHITE });
  cursor -= headerH;

  specs.forEach(([label, value], i) => {
    const rowY = cursor - rowH;
    page.drawRectangle({ x: tX, y: rowY, width: tW, height: rowH, color: i % 2 === 0 ? WHITE : LIGHT });
    page.drawLine({ start: { x: tX + col1W, y: rowY }, end: { x: tX + col1W, y: cursor }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) });
    page.drawText(label, { x: tX + 10, y: rowY + 5, size: 10, font, color: DARK });
    page.drawText(value, { x: tX + col1W + 10, y: rowY + 5, size: 10, font, color: DARK });
    cursor = rowY;
  });
  page.drawRectangle({ x: tX, y: cursor, width: tW, height: headerH + specs.length * rowH, borderColor: rgb(0.8, 0.8, 0.8), borderWidth: 0.75 });
  cursor -= 22;

  // ══════════ ЦЕНА (выделяем 22% из цены) ══════════
  const total = parsePrice(product.price);
  const vat = Math.round((total * 22) / 122);
  const base = total - vat;

  const priceCardX = margin;
  const priceCardW = width - margin * 2;
  const rowGap = 24;
  const totalGap = 10;
  const cardPad = 14;
  const wordsLine = 'В стоимость включён НДС 22%: ' + priceInWords(vat);

  function countWrappedLines(text: string, size: number, maxW: number): number {
    const wa = text.split(' '); let line = ''; let lines = 1;
    for (const w of wa) { const test = line ? line + ' ' + w : w; if (font.widthOfTextAtSize(test, size) > maxW && line) { lines++; line = w; } else line = test; }
    return lines;
  }
  const wSize = 9;
  const wL = countWrappedLines(wordsLine, wSize, priceCardW - cardPad * 2);
  const cardH = 3 * rowGap + totalGap + 20 + wL * (wSize + 3) + cardPad;

  function drawWrapped(text: string, x: number, y: number, size: number, maxW: number): number {
    const wa = text.split(' '); let line = ''; let yy = y;
    for (const w of wa) { const test = line ? line + ' ' + w : w; if (font.widthOfTextAtSize(test, size) > maxW && line) { page.drawText(line, { x, y: yy, size, font, color: GRAY }); yy -= size + 3; line = w; } else line = test; }
    if (line) page.drawText(line, { x, y: yy, size, font, color: GRAY });
    return yy;
  }

  const cardTop = cursor;
  page.drawRectangle({ x: priceCardX, y: cardTop - cardH, width: priceCardW, height: cardH, color: LIGHT, borderColor: RED, borderWidth: 1.25 });

  let py = cardTop - cardPad - 4;
  for (const r of [
    { label: 'Стоимость (без НДС)', value: formatPriceKop(base), kind: 'n' },
    { label: 'В т.ч. НДС 22%', value: formatPriceKop(vat), kind: 'n' },
    { label: 'Цена с НДС 22%', value: formatPriceKop(total), kind: 't' },
  ]) {
    if (r.kind === 't') {
      py -= totalGap;
      page.drawText(r.label, { x: priceCardX + cardPad, y: py + 3, size: 13, font, color: DARK });
      page.drawText(r.value, { x: priceCardX + priceCardW - cardPad - font.widthOfTextAtSize(r.value, 17), y: py, size: 17, font, color: RED });
      py -= 20;
      drawWrapped(wordsLine, priceCardX + cardPad, py - 14, wSize, priceCardW - cardPad * 2);
    } else {
      page.drawText(r.label, { x: priceCardX + cardPad, y: py, size: 12, font, color: GRAY });
      page.drawText(r.value, { x: priceCardX + priceCardW - cardPad - font.widthOfTextAtSize(r.value, 13), y: py, size: 13, font, color: DARK });
      py -= rowGap;
    }
  }
  cursor = cardTop - cardH - 20;

  // ══════════ НАЛИЧИЕ / ДОСТАВКА ══════════
  const inStock = product.availability === 'в наличии';
  const powerNum = parseInt(product.characteristics.power) || 0;
  const delivery = powerNum > 250 ? 'от 50 000 ₽' : powerNum > 100 ? 'от 45 000 ₽' : 'от 35 000 ₽';
  page.drawText('Наличие', { x: priceCardX + cardPad, y: cursor, size: 12, font, color: GRAY });
  page.drawText(inStock ? 'В наличии' : 'Под заказ', { x: priceCardX + priceCardW - cardPad - font.widthOfTextAtSize(inStock ? 'В наличии' : 'Под заказ', 13), y: cursor, size: 13, font, color: DARK });
  cursor -= 22;
  page.drawText('Доставка', { x: priceCardX + cardPad, y: cursor, size: 12, font, color: GRAY });
  page.drawText(delivery, { x: priceCardX + priceCardW - cardPad - font.widthOfTextAtSize(delivery, 13), y: cursor, size: 13, font, color: DARK });
  cursor -= 22;

  // ══════════ ФУТЕР (реквизиты) ══════════
  const footerLines: string[] = [
    'Группа компаний «Теплоэнергетика»: в составе ООО «Теплоэнергетика» ИНН/КПП 7453327310/745301001',
    'и ИП Растворов Д.В. ИНН/ОГРНИП 741113112907/316745600169332. г. Челябинск, ул. Автодорожная 17, офис 203.',
    'Тел.: 750-11-36; 8-919-338-96-19; 8-922-750-11-36; 8-(351)-220-80-88',
  ];
  page.drawLine({ start: { x: margin, y: 96 }, end: { x: width - margin, y: 96 }, thickness: 0.75, color: rgb(0.8, 0.8, 0.8) });
  let fy = 84;
  for (const line of footerLines) {
    page.drawText(line, { x: margin, y: fy, size: 8, font, color: GRAY });
    fy -= 11;
  }

  return await pdfDoc.save();
}