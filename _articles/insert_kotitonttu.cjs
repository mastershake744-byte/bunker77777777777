const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/Иван/Next/ivan";
const ARTICLES = path.join(ROOT, "src", "data", "articles.ts");
const text = fs.readFileSync(path.join(ROOT, "_articles", "kotitonttu-gazovye-kotly-obzor.html"), "utf8").trim();

const newArticle = {
  id: 26,
  name: "Обзор линейки газовых котлов Kotitonttu: модели, мощности, цены",
  url: "obzor-linejki-gazovyh-kotlov-kotitonttu/",
  photo: "/images/product/categories/faci/gaz.webp",
  text: text,
  seo_title: "Обзор газовых котлов Kotitonttu: линейка Toivo, мощности, цены",
  seo_description:
    "Обзор настенных газовых котлов Kotitonttu Toivo: модельный ряд, мощность, цена, плюсы и минусы. Как выбрать котёл под дом и сколько он стоит.",
  tags: ["Kotitonttu", "газовые котлы", "Toivo", "настенные котлы", "обзор котлов"],
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
console.log("articles.ts updated — added article id=26");