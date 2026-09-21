const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/Иван/Next/ivan";
const ARTICLES = path.join(ROOT, "src", "data", "articles.ts");
const DIR = path.join(ROOT, "_articles");

const defs = [
  {
    file: "esab-mp-3-harakteristiki.html",
    name: "Электроды ESAB MP-3 3 мм: характеристики и расшифровка марки",
    url: "elektrody-esab-mp-3-harakteristiki/",
    photo: "/images/other/esab-mp3-1.jpg",
    seo_title: "Электроды ESAB MP-3 3 мм: характеристики, расшифровка марки, обзор",
    seo_description: "Полные характеристики электродов ESAB MP-3 3 мм: тип Э46, рутиловое покрытие, ток 80–140 А, AC/DC. Для какой стали, что можно и нельзя варить, на что смотреть при покупке.",
    tags: ["ESAB MP-3", "характеристики электродов", "электроды 3 мм", "рутиловые электроды"],
  },
  {
    file: "diametr-elektrodov-25-3-4-mm.html",
    name: "Какой диаметр электрода выбрать: 2,5, 3 или 4 мм",
    url: "diametr-elektrodov-25-3-4-mm/",
    photo: "/images/other/esab-mp3-2.jpg",
    seo_title: "Какой диаметр электрода выбрать: 2,5, 3 или 4 мм под толщину металла",
    seo_description: "Как выбрать диаметр электрода под толщину металла: таблица 2, 2,5, 3, 4 мм, рекомендуемые токи, типичные задачи. Почему 3 мм — золотая середина для дома и дачи.",
    tags: ["диаметр электрода", "подбор электродов", "электроды 3 мм", "ESAB MP-3"],
  },
  {
    file: "raskhod-elektrodov-esab-mp-3.html",
    name: "Расход электродов ESAB MP-3: сколько сварить пачкой 5 кг",
    url: "raskhod-elektrodov-esab-mp-3/",
    photo: "/images/other/esab-mp3-1.jpg",
    seo_title: "Расход электродов ESAB MP-3: сколько метров шва в пачке 5 кг",
    seo_description: "Сколько электродов уходит на 1 кг наплавленного металла, метры шва на пачку 5 кг, почему 5 кг выгоднее 1 кг, реальные примеры: забор, ворота, теплица.",
    tags: ["расход электродов", "ESAB MP-3", "пачка 5 кг", "экономия"],
  },
  {
    file: "esab-mp3-ili-mrs3-ano21-ozs12-uoni.html",
    name: "ESAB MP-3 или МР-3С, АНО-21, ОЗС-12, УОНИ 13/55: что выбрать",
    url: "esab-mp3-ili-mrs3-ano21-ozs12-uoni/",
    photo: "/images/other/esab-mp3-2.jpg",
    seo_title: "ESAB MP-3 или МР-3С, АНО-21, ОЗС-12, УОНИ 13/55 — сравнение",
    seo_description: "Сравнение электродов MP-3, МР-3С, АНО-21, ОЗС-12, УОНИ 13/55: покрытие, ток, назначение. Таблица выбора и что брать под бытовую сварку.",
    tags: ["сравнение электродов", "MP-3", "УОНИ 13/55", "АНО-21"],
  },
  {
    file: "esab-mp3-dlya-novichka.html",
    name: "ESAB MP-3 для новичка: почему с ним легче всего учиться варить",
    url: "esab-mp3-dlya-novichka/",
    photo: "/images/other/esab-mp3-1.jpg",
    seo_title: "ESAB MP-3 для новичка: с чего начать учиться сварке",
    seo_description: "Почему рутиловые электроды ESAB MP-3 — лучший выбор для первой сварки: лёгкий поджиг, стабильная дуга, прощает ошибки. Советы по первым шагам и упражнениям.",
    tags: ["сварка для новичка", "ESAB MP-3", "обучение сварке", "первый электрод"],
  },
  {
    file: "khranenie-i-prokalka-elektrodov.html",
    name: "Как хранить и прокаливать электроды ESAB MP-3",
    url: "khranenie-i-prokalka-elektrodov/",
    photo: "/images/other/esab-mp3-2.jpg",
    seo_title: "Хранение и прокалка электродов ESAB MP-3: правила и режимы",
    seo_description: "Как хранить электроды, чтобы не отсырели, как понять, что электроды отсырели, режимы прокалки MP-3 в печи и домашней духовке. Советы по сроку хранения.",
    tags: ["хранение электродов", "прокалка", "ESAB MP-3", "отсыревшие электроды"],
  },
  {
    file: "svarka-tonkogo-metalla-3mm.html",
    name: "Как варить тонкий металл электродом 3 мм без прожогов",
    url: "svarka-tonkogo-metalla-3mm/",
    photo: "/images/other/esab-mp3-1.jpg",
    seo_title: "Сварка тонкого металла электродом 3 мм: ток, техника, советы",
    seo_description: "Как варить тонкий металл 2–3 мм электродом 3 мм без прожогов: ток 80–100 А, короткая дуга, техника ведения, подготовка кромок, типичные ошибки.",
    tags: ["сварка тонкого металла", "прожоги", "ESAB MP-3", "техника сварки"],
  },
  {
    file: "rezhimy-svarki-esab-mp3-tablica-toka.html",
    name: "Режимы сварки ESAB MP-3: таблица тока и полярность",
    url: "rezhimy-svarki-esab-mp3-tablica-toka/",
    photo: "/images/other/esab-mp3-2.jpg",
    seo_title: "Режимы сварки ESAB MP-3 3 мм: таблица тока, полярность, положения",
    seo_description: "Подбор сварочного тока для ESAB MP-3 3 мм: таблица по толщине металла и положению шва, полярность DC+ / DC− / AC, как понять, что ток правильный.",
    tags: ["режимы сварки", "сварочный ток", "ESAB MP-3", "полярность"],
  },
  {
    file: "esab-mp3-rossijskoe-proizvodstvo-kachestvo.html",
    name: "ESAB MP-3 российского производства: качество, оригинал и мифы",
    url: "esab-mp3-rossijskoe-proizvodstvo-kachestvo/",
    photo: "/images/other/esab-mp3-1.jpg",
    seo_title: "ESAB MP-3 российского производства: стоит ли доверять качеству",
    seo_description: "Где производят ESAB MP-3, чем российский электрод отличается от импортного, плюсы локализации, как отличить оригинал от подделки, мифы о качестве.",
    tags: ["ESAB MP-3", "производство России", "подделка", "качество"],
  },
  {
    file: "kakoj-apparat-podkhodit-dlya-mp3.html",
    name: "Какой сварочный аппарат подходит для ESAB MP-3",
    url: "kakoj-apparat-podkhodit-dlya-mp3/",
    photo: "/images/other/esab-mp3-2.jpg",
    seo_title: "Какой сварочный аппарат нужен для электродов ESAB MP-3",
    seo_description: "Инвертор или трансформатор для ESAB MP-3 3 мм: рекомендуемый ток, полярность, функции горячего старта. Что купить вместе с электродами и как выбрать аппарат.",
    tags: ["сварочный аппарат", "инвертор", "ESAB MP-3", "выбор аппарата"],
  },
  {
    file: "elektrod-lipnet-duga-ne-zazhigaetsya.html",
    name: "Почему электрод липнет и дуга не зажигается: 5 причин и решений",
    url: "elektrod-lipnet-duga-ne-zazhigaetsya/",
    photo: "/images/other/esab-mp3-1.jpg",
    seo_title: "Почему электрод липнет и дуга не зажигается: диагностика и решение",
    seo_description: "5 частых проблем при сварке: электрод липнет, дуга гаснет, много брызг, грязный шов, поры. Причины и решения, диагностика по звуку дуги.",
    tags: ["электрод липнет", "дуга не зажигается", "поры в шве", "ESAB MP-3"],
  },
  {
    file: "upakovka-elektrodov-esab-mp3-5kg.html",
    name: "Упаковка ESAB MP-3 5 кг: как проверить и отличить подделку",
    url: "upakovka-elektrodov-esab-mp3-5kg/",
    photo: "/images/other/esab-mp3-2.jpg",
    seo_title: "Упаковка электродов ESAB MP-3 5 кг: маркировка и защита от подделки",
    seo_description: "Что должно быть на пачке ESAB MP-3 5 кг, как проверить упаковку в магазине, как отличить оригинал от подделки, как хранить открытую пачку.",
    tags: ["упаковка", "подделка", "ESAB MP-3", "маркировка"],
  },
  {
    file: "tekhnika-svarki-elektrodom-3mm.html",
    name: "Техника сварки электродом 3 мм: пошаговая инструкция",
    url: "tekhnika-svarki-elektrodom-3mm/",
    photo: "/images/other/esab-mp3-1.jpg",
    seo_title: "Техника сварки электродом 3 мм: пошаговая инструкция для начинающих",
    seo_description: "Пошаговая методика сварки электродом 3 мм: подготовка, поджиг дуги, ведение электрода, контроль ванны, завершение шва. Типичные ошибки и их исправление.",
    tags: ["техника сварки", "сварка электродом", "ESAB MP-3", "обучение"],
  },
  {
    file: "peremennyj-tok-i-polyarnost-mp3.html",
    name: "Переменный ток и полярность: на чём варить ESAB MP-3",
    url: "peremennyj-tok-i-polyarnost-mp3/",
    photo: "/images/other/esab-mp3-2.jpg",
    seo_title: "Переменный ток и полярность для ESAB MP-3: что выбрать",
    seo_description: "На каком токе варить ESAB MP-3: DC+, DC− или AC. Разница между инвертором и трансформатором, полярность, частые вопросы, таблица режимов.",
    tags: ["полярность", "переменный ток", "ESAB MP-3", "DC AC"],
  },
  {
    file: "test-esab-mp3-rzhavchina-kraska-ocinkovka.html",
    name: "Тест ESAB MP-3: как варит по ржавчине, краске и оцинковке",
    url: "test-esab-mp3-rzhavchina-kraska-ocinkovka/",
    photo: "/images/other/esab-mp3-1.jpg",
    seo_title: "Тест ESAB MP-3: сварка по ржавчине, краске и оцинковке",
    seo_description: "Честный тест ESAB MP-3 3 мм: сварка по ржавчине, краске и оцинковке. Результаты, таблица, вердикт — что прощает MP-3, а что требует зачистки.",
    tags: ["тест электродов", "ржавчина", "оцинковка", "ESAB MP-3"],
  },
];

const raw = fs.readFileSync(ARTICLES, "utf8");
const end = raw.lastIndexOf("];");
if (end < 0) { console.error("Cannot find array end"); process.exit(1); }
const head = raw.slice(0, end);
const tail = raw.slice(end);

function toTs(article) {
  const lines = [];
  lines.push("  {");
  for (const [k, v] of Object.entries(article)) {
    lines.push(`    ${k}: ${JSON.stringify(v)},`);
  }
  lines.push("  },");
  return lines.join("\n");
}

let nextId = 11;
const blocks = [];
for (const d of defs) {
  const filePath = path.join(DIR, d.file);
  if (!fs.existsSync(filePath)) { console.error("Missing file: " + d.file); process.exit(1); }
  const text = fs.readFileSync(filePath, "utf8").trim();
  const article = { id: nextId++, name: d.name, url: d.url, photo: d.photo, text, seo_title: d.seo_title, seo_description: d.seo_description, tags: d.tags };
  blocks.push(toTs(article));
}

const out = head + "\n" + blocks.join("\n") + "\n" + tail;
fs.writeFileSync(ARTICLES, out, "utf8");
console.log("articles.ts updated — added " + blocks.length + " articles (ids 11.." + (nextId - 1) + ")");