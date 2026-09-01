const fs = require('fs');
const filePath = 'C:\\Users\\Иван\\Next\\ivan\\src\\data\\products.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const result = [];
let inObject = false;
let hasPhoto = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (/^\s*\{/.test(line) && !inObject) {
    inObject = true;
    hasPhoto = false;
    braceCount = 0;
  }

  if (inObject) {
    for (const ch of line) {
      if (ch === '{') braceCount++;
      if (ch === '}') braceCount--;
    }
  }

  if (inObject && /^\s*photo:/.test(line)) {
    hasPhoto = true;
  }

  if (inObject && braceCount <= 0 && /^\s*\},/.test(line)) {
    inObject = false;
    if (!hasPhoto) {
      const indent = line.match(/^\s*/)[0];
      result.push(indent + "  photo: 'по запросу',");
    }
  }

  result.push(line);
}

fs.writeFileSync(filePath, result.join('\n'), 'utf-8');
console.log('Done');