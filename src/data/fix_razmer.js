const fs = require('fs');
const filePath = 'C:\\Users\\Иван\\Next\\ivan\\src\\data\\products.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const result = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (/^\s*razmer:/.test(line) && !/,\s*$/.test(line)) {
    line = line.replace(/\}\s*$/, '},');
  }
  result.push(line);
}

fs.writeFileSync(filePath, result.join('\n'), 'utf-8');
console.log('Fixed razmer trailing commas');