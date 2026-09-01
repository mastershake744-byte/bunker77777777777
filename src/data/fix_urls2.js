const fs = require('fs');
const filePath = 'C:\\Users\\Иван\\Next\\ivan\\src\\data\\products.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const result = [];
let inCatSection = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (/const _categories/.test(line)) {
    inCatSection = true;
  }

  // Normalize product URLs: ensure exactly ONE trailing slash
  if (!inCatSection && /^\s*url: '([^']+?)'/.test(line)) {
    line = line.replace(/url: '([^']+)'/, (match, url) => {
      return "url: '" + url.replace(/\/+$/, '') + "/'";
    });
  }

  result.push(line);
}

fs.writeFileSync(filePath, result.join('\n'), 'utf-8');
console.log('Normalized URLs to single trailing slash');