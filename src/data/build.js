const fs = require('fs');
const ExcelJS = require('C:\\Users\\Иван\\.config\\gigatool\\skills\\xlsx\\vendor\\exceljs.bundle.cjs');

const SITE_URL = 'https://xn--90ahqccr2a8a0eya.xn--p1ai';

// Извлекаем массив boilersData из products.ts (без TypeScript-типов)
function extractProducts() {
  const raw = fs.readFileSync(
    'C:\\Users\\Иван\\Next\\ivan\\src\\data\\products.ts',
    'utf-8'
  );

  const start = raw.indexOf('export const boilersData: Product[] = [');
  if (start < 0) throw new Error('boilersData не найден');

  // Конец массива — первый '];' после начала
  const end = raw.indexOf('];', start);
  if (end < 0) throw new Error('Конец массива не найден');

  let section = raw.slice(start, end + 2);
  section = section.replace('export const boilersData: Product[] = ', '');

  // Убираем TS-аннотации типов
  section = section.replace(/:\s*(string|number|boolean)\b/g, '');
  section = section.replace(/:\s*(Product\[\]|Category)\b/g, '');

  const products = new Function('return ' + section + ';')();
  if (!Array.isArray(products)) throw new Error('Не удалось распарсить товары');
  return products;
}

(async () => {
  const products = extractProducts();

  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet('Товары');

  // Заголовки
  sheet.getCell('A1').value = 'Название';
  sheet.getCell('B1').value = 'Адрес';
  sheet.getColumn('A').width = 60;
  sheet.getColumn('B').width = 90;

  // Стиль шапки
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, size: 12 };
  headerRow.height = 22;

  // Заморозка шапки
  sheet.views = [{ state: 'frozen', ySplit: 1 }];

  // Данные: все товары + ссылка на страницу товара
  const data = products.map((p) => [
    p.name,
    `${SITE_URL}/product/${p.url.replace(/\/+$/, '')}/`,
  ]);

  data.forEach((row, index) => {
    sheet.getCell(`A${index + 2}`).value = row[0];
    sheet.getCell(`B${index + 2}`).value = row[1];
  });

  // Автофильтр
  sheet.autoFilter = { from: 'A1', to: `B${data.length + 1}` };

  await wb.xlsx.writeFile(
    'C:\\Users\\Иван\\Next\\ivan\\src\\data\\товары-адреса.xlsx'
  );
  console.log(`Записано товаров: ${data.length}`);
})();