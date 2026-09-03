const fs = require('fs');
const raw = fs.readFileSync('src/data/products.ts', 'utf-8');

// Remove comments
let out = '';
let inStr = false, strChar = '';
for (let i = 0; i < raw.length; i++) {
  const ch = raw[i], nx = raw[i+1];
  if (inStr) { out += ch; if (ch === strChar) inStr = false; continue; }
  if (ch === "'" || ch === '"' || ch === '`') { inStr = true; strChar = ch; out += ch; continue; }
  if (ch === '/' && nx === '/') { while (i < raw.length && raw[i] !== '\n') i++; out += '\n'; continue; }
  if (ch === '/' && nx === '*') { while (i < raw.length && !(raw[i] === '*' && raw[i+1] === '/')) i++; i += 2; continue; }
  out += ch;
}

// Find the boilersData array
const start = out.indexOf('export const boilersData: Product[] = [');
if (start < 0) { console.error('NOT FOUND'); process.exit(1); }
out = out.slice(start);
out = out.replace('export const boilersData: Product[] = [', 'module.exports = [');

// Cut at next export
const next = out.indexOf('\nexport ');
if (next > 0) out = out.slice(0, next);

// Remove TS annotations
out = out.replace(/:\s*(string|number|boolean)\b/g, '');
out = out.replace(/:\s*(Product\[\]|Category)\b/g, '');

fs.writeFileSync('_prods_check.cjs', out);
console.log('File size:', out.length);

try {
  const data = require('./_prods_check.cjs');
  console.log('OK:', data.length, 'products');
  console.log('First:', data[0].name);
} catch(e) {
  console.log('FAIL:', e.message.substring(0, 300));
  // Show first 200 chars of output
  console.log('---BEGIN---');
  console.log(out.substring(0, 200));
  console.log('---END---');
}