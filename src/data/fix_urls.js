const fs = require('fs');
const filePath = 'C:\\Users\\Иван\\Next\\ivan\\src\\data\\products.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const result = [];
let inCatSection = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // Detect _categories section - stop modifying after that
  if (/const _categories/.test(line)) {
    inCatSection = true;
  }

  // Add trailing slash to product URLs (not category URLs, not already ending with /)
  if (!inCatSection && /^\s*url: '([^']+?)'/.test(line) && !/\/'$/.test(line.trim())) {
    line = line.replace(/url: '([^']+)'/, "url: '$1/'");
  }

  result.push(line);
}

fs.writeFileSync(filePath, result.join('\n'), 'utf-8');
console.log('Added trailing slashes to all product URLs');