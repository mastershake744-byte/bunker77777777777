const fs = require('fs');
const raw = fs.readFileSync('src/data/products.ts', 'utf-8');

// Strip comments
let out = '', inStr = false, strChar = '';
for (let i = 0; i < raw.length; i++) {
  const ch = raw[i], nx = raw[i+1];
  if (inStr) { out += ch; if (ch === strChar) inStr = false; continue; }
  if (ch === "'" || ch === '"' || ch === '`') { inStr = true; strChar = ch; out += ch; continue; }
  if (ch === '/' && nx === '/') { while (i < raw.length && raw[i] !== '\n') i++; out += '\n'; continue; }
  if (ch === '/' && nx === '*') { while (i < raw.length && !(raw[i] === '*' && raw[i+1] === '/')) i++; i += 2; continue; }
  out += ch;
}

// Find boilersData array start
const start = out.indexOf('export const boilersData: Product[] = [');
if (start < 0) { console.error('NOT FOUND'); process.exit(1); }
out = out.slice(start);
out = out.replace('export const boilersData: Product[] = [', 'module.exports = [');

// Find "];" followed by newline + export — that's the array end
const arrEnd = out.indexOf('];\n');
if (arrEnd < 0) { console.error('Array end not found'); process.exit(1); }
out = out.slice(0, arrEnd + 2);  // include the ];

// Strip TS types  
out = out.replace(/:\s*(string|number|boolean)\b/g, '');
out = out.replace(/:\s*(Product\[\]|Category)\b/g, '');

fs.writeFileSync('_prods_final.cjs', out);
console.log('Size:', out.length);

try {
  const data = require('./_prods_final.cjs');
  console.log('OK:', data.length, 'products');
  if (data.length > 0) {
    console.log('First:', data[0].name);
    console.log('Chars:', data[0].characteristics?.power);
    console.log('Photo:', data[0].photo);
  }
} catch(e) {
  console.log('FAIL:', e.message.substring(0, 200));
  const m = e.message.match(/line\s*(\d+)/i);
  if (m) {
    const ln = parseInt(m[1]);
    const lines = out.split('\n');
    for (let i = Math.max(0,ln-2); i < Math.min(lines.length, ln+2); i++) {
      console.log((i+1) + ': ' + lines[i].substring(0,120));
    }
  }
}