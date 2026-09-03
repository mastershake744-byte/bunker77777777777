const os = require("os");
const path = require("path");
const CFG = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
const SKILL = path.join(CFG, "gigatool", "skills", "word");
const H = require(path.join(SKILL, "helpers", "index.cjs"));

const PRICE_TOTAL = 415000;
const VAT_RATE = 20;
const VAT_AMOUNT = Math.round(PRICE_TOTAL * VAT_RATE / 120);
const PRICE_NO_VAT = PRICE_TOTAL - VAT_AMOUNT;
const DELIVERY_CHITA = 65000;

function numWords(n) {
  const words = [
    "", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
    "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать",
    "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"
  ];
  const tens = ["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
  const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];

  if (n === 0) return "ноль";
  let s = "";
  if (n >= 100000) {
    const t = Math.floor(n / 100000);
    const rem = n % 100000;
    if (t === 1) s += "сто ";
    else if (t === 2) s += "двести ";
    else if (t === 3) s += "триста ";
    else if (t >= 4 && t <= 9) s += hundreds[t] + " ";
    if (rem > 0) s += numWords(rem);
    return s.trim();
  }
  if (n >= 1000) {
    const t = Math.floor(n / 1000);
    const rem = n % 1000;
    if (t === 1) s += "одна тысяча ";
    else if (t === 2) s += "две тысячи ";
    else if (t >= 3 && t <= 4) s += words[t] + " тысячи ";
    else if (t >= 5 && t <= 19) s += words[t] + " тысяч ";
    else { s += numWords(t) + " тысяч "; }
    if (rem > 0) s += numWords(rem);
    return s.trim();
  }
  if (n >= 100) {
    const t = Math.floor(n / 100);
    s += hundreds[t] + " ";
    n %= 100;
  }
  if (n >= 20) {
    const t = Math.floor(n / 10);
    s += tens[t] + " ";
    n %= 10;
  }
  if (n > 0) s += words[n] + " ";
  return s.trim();
}

const priceInWords = numWords(PRICE_TOTAL) + " рублей 00 копеек";

(async () => {
  const doc = H.createDoc({ title: "КП Вулкан RED 150" });

  // Header block
  doc.paragraph("Теплоэнергетика");
  doc.paragraph("г. Челябинск, ул. Гостевая 3, офис 103");
  doc.paragraph("тел. 8 (351) 220-80-88; 8-982-324-95-25; 8-919-338-96-19");
  doc.paragraph("e-mail: kotli@teplo-en.ru; rdv@teplo-en.ru");
  doc.spacer();

  // Date
  const now = new Date();
  const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  doc.paragraph(`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}г.`);
  doc.spacer();

  // Title
  doc.heading("Технико-коммерческое предложение", 1);
  doc.paragraph("на угольный котел Вулкан RED 150 с ручной подачей");
  doc.spacer();

  // Specs table
  doc.heading("Технические характеристики", 2);
  doc.table([
    ["Характеристика", "Значение"],
    ["Диапазон мощности, кВт", "60…150"],
    ["Производство", "Россия"],
    ["Производитель", "Vulkan"],
    ["Толщина стали, мм", "6"],
    ["КПД, %", "86"],
    ["Вес", "890 кг"],
    ["Объем топки", "329 л"],
    ["Отапливаемая площадь", "1500 кв. м."],
    ["Гарантия, лет", "3"],
    ["Срок службы, лет", "15"],
    ["Максимальная мощность, кВт", "150"],
    ["Основное топливо", "Уголь, Дрова, Топливные брикеты"],
    ["Марка стали", "09Г2С"],
    ["Наличие автоматики", "Да"],
    ["Количество контуров", "Одноконтурный"],
    ["Объем воды в котле", "361 л"],
    ["Максимальное давление, бар", "2.5"],
    ["Диаметр дымохода, мм", "219"],
    ["Диаметр патрубков подключения", "G 2 1/2\""],
    ["Тип котла", "Полуавтоматический твердотопливный котел"],
    ["Тип теплообменника", "Горизонтальный, Трубчатый"],
    ["Глубина, мм", "1605"],
    ["Ширина, мм", "661"],
    ["Высота, мм", "1325"],
    ["Габариты, Г*Ш*В, мм", "1605 × 661 × 1325"],
    ["Цвет", "красный, черный"],
    ["Время автономной работы", "до 12 часов"],
  ], { widths: [0.45, 0.55] });
  doc.spacer();

  // Price
  doc.heading("Стоимость", 2);
  doc.paragraph(`Стоимость котла: ${PRICE_TOTAL.toLocaleString("ru-RU")},00 рублей (${priceInWords}), в т.ч. НДС (${VAT_RATE}%) ${VAT_AMOUNT.toLocaleString("ru-RU")},33 руб.`);
  doc.paragraph(`Цена без НДС: ${PRICE_NO_VAT.toLocaleString("ru-RU")},00 рублей`);
  doc.spacer();

  // Delivery
  doc.heading("Доставка", 2);
  doc.paragraph(`Доставка до г. Чита: ${DELIVERY_CHITA.toLocaleString("ru-RU")},00 рублей`);
  doc.paragraph("Срок изготовления: 45 рабочих дней.");
  doc.paragraph("Доставка: ТК силами поставщика, за счет заказчика.");
  doc.spacer();

  // Company info
  doc.heading("Исполнитель", 2);
  doc.paragraph('Группа компаний «Теплоэнергетика»: в составе ООО «Теплоэнергетика» ИНН/КПП 7453327310/745301001 и ИП Растворов Д.В. ИНН/ОГРНИП 741113112907/316745600169332.');
  doc.paragraph("г. Челябинск ул. Гостевая д.3 офис 103.");
  doc.paragraph("Тел.: 8 (351) 220-80-88; 8-982-324-95-25; 8-919-338-96-19");
  doc.paragraph("e-mail: kotli@teplo-en.ru; rdv@teplo-en.ru");
  doc.spacer();

  // Validity
  doc.paragraph("ДАННОЕ ПРЕДЛОЖЕНИЕ ДЕЙСТВИТЕЛЬНО В ТЕЧЕНИЕ 10 (десяти) РАБОЧИХ ДНЕЙ!");
  doc.spacer();

  // Examples
  doc.heading("Примеры наших работ", 2);
  doc.paragraph("От проекта до ввода в эксплуатацию:");
  doc.bullets([
    "Московская область. 430 кВт.",
    "Контейнерная котельная на твёрдом топливе в Якутию 400 кВт.",
    "Крайний север, п-ов Ямал, 200 кВт.",
    "Ульяновская обл. 1000 кВт. Монтаж на площадке заказчика.",
    "Респ. Карелия 40 кВт.",
    "Челябинская обл. 78 кВт, со складом топлива.",
    "г. Москва, Тропарёво — от сборки в цехе до ввода в эксплуатацию.",
  ]);
  doc.spacer();

  // Director signature
  doc.paragraph("Директор _________________________ Д.В. Растворов");
  doc.spacer();
  doc.spacer();

  // Footer info
  doc.paragraph('Компания «Теплоэнергетика»');
  doc.paragraph('Г. Челябинск, ул. Гостевая 3.');
  doc.paragraph('Тел.: 8 (351) 220-80-88; 8-982-324-95-25; 8-919-338-96-19');
  doc.paragraph('e-mail: kotli@teplo-en.ru; web: www.teplo-en.ru');

  await doc.save("КП Вулкан RED 150.docx");
  console.log("wrote КП Вулкан RED 150.docx");
})();