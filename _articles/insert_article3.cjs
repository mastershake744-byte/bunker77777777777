const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/Иван/Next/ivan";
const ARTICLES = path.join(ROOT, "src", "data", "articles.ts");
const text3 = fs.readFileSync(path.join(ROOT, "_articles", "article3.html"), "utf8").trim();

const newArticle = {
  id: 10,
  name: "Звукоизоляция и виброизоляция котельной",
  url: "zvukoizolyatsiya-vibroizolyatsiya-kotelnoj/",
  photo: "/images/other/modul.webp",
  text: text3,
  seo_title: "Звукоизоляция и виброизоляция котельной — как сделать котельную тихой",
  seo_description:
    "Как снизить шум от котельной: виброопоры, гибкие вставки, шумоглушители, звукоизоляция стен. Нормы шума для жилых зон, типовые решения и цены. Советы инженеров «Теплоэнергетики».",
  tags: ["звукоизоляция котельной", "виброизоляция", "шум от котельной", "тихая котельная"],
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
console.log("articles.ts updated — added article id=10");