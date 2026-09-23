const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/Иван/Next/ivan";
const ARTICLES = path.join(ROOT, "src", "data", "articles.ts");
const text = fs.readFileSync(path.join(ROOT, "_articles", "kotelnaya-dlya-ulichnogo-basseyna.html"), "utf8").trim();

const newArticle = {
  id: 27,
  name: "Котельная для уличного бассейна: что выгоднее — уголь, пеллеты или газ",
  url: "kotelnaya-dlya-ulichnogo-basseyna/",
  photo: "/images/product/categories/faci.jpg",
  text: text,
  seo_title: "Котельная для уличного бассейна: уголь, пеллеты или газ — что выгоднее в 2026",
  seo_description:
    "Что выгоднее топить уличный бассейн: уголь, пеллеты или газ. Почему нельзя везде провести газ, таблица стоимости 1 Гкал тепла на 2026 год, СП 31-113-2004 и примеры расчётов.",
  tags: ["котельная для бассейна", "отопление бассейна", "уголь или пеллеты", "газ для бассейна", "СП 31-113-2004"],
};

const raw = fs.readFileSync(ARTICLES, "utf8");
const end = raw.lastIndexOf("];");
if (end < 0) { console.error("Cannot find array end"); process.exit(1); }

const head = raw.slice(0, end);
const tail = raw.slice(end);

function toTs(obj) {
  const lines = [];
  lines.push("  {");
  for (const [k, v] of Object.entries(obj)) {
    lines.push(`    ${k}: ${JSON.stringify(v)},`);
  }
  lines.push("  },");
  return lines.join("\n");
}

const out = head + "\n" + toTs(newArticle) + "\n" + tail;
fs.writeFileSync(ARTICLES, out, "utf8");
console.log("articles.ts updated — added article id=27");