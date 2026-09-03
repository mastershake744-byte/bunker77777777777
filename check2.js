const fs = require('fs');
const out = fs.readFileSync('_prods_check.cjs', 'utf-8');

// Find suspicious lines
const lines = out.split('\n');
let issues = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // property without colon before value
  if (l.match(/^\s{4,}\w+\s+'/) || l.match(/^\s{4,}\w+\s+\d+/)) {
    issues.push('line ' + (i+1) + ': ' + l.trim().substring(0, 80));
  }
  if (l.includes('const ')) {
    const noStr = l.replace(/'[^']*'/g, '').replace(/"[^"]*"/g, '');
    if (noStr.includes('const')) {
      issues.push('CONST line ' + (i+1) + ': ' + l.trim().substring(0, 80));
    }
  }
}
console.log('ISSUES (' + issues.length + '):');
console.log(issues.slice(0, 15).join('\n'));

try {
  require('./_prods_check.cjs');
  console.log('REQUIRE OK');
} catch (e) {
  console.log('REQUIRE FAIL:', e.message.substring(0, 200));
  const stackLine = (e.stack && e.stack.split('\n').find(l => l.includes('_prods'))) || '';
  console.log('STACK:', stackLine.trim());
}