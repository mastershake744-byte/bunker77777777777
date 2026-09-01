const fs = require('fs');
const filePath = 'C:\\Users\\Иван\\Next\\ivan\\src\\data\\products.ts';
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const result = [];
let inCatSection = false;
let currentObjId = null;
let hasDocuments = false;
let startLineIdx = -1;

const docMap = {
  'vulkan-eko': '/pdf/vulkan/Vulkan Eko от 14.04.21.pdf',
  'vulkan-eko-max': '/pdf/vulkan/Vulkan Eko Max, Eko Max Z от 14.04.21.pdf',
  'vulkan-eko-max-duo': '/pdf/vulkan/Паспорт и руководство EKO MAX DUO 09.09.2022.pdf',
  'boss': '/pdf/vulkan/Паспорт Boss от 19.05.21.pdf',
  'green-eko-max': '/pdf/vulkan/Паспорт Green от 19.05.2021 11-48кВт.pdf',
  'green': '/pdf/vulkan/Паспорт Green от 19.05.2021 11-48кВт.pdf',
  'optimum': '/pdf/vulkan/Паспорт Optimum UNI, ULTRA, UNI МАХ 19.05.21.pdf',
  'alpha': '/pdf/vulkan/Паспорт и руководство ALPHA от 05.02.20.pdf',
  'red': '/pdf/vulkan/Паспорт и руководство Red 16.12.20.pdf',
  'sigma': '/pdf/vulkan/Паспорт и руководство Red 16.12.20.pdf',
  'feniks-100': '/pdf/vulkan/Феникс 15-100 от 12.22.22.pdf',
  'feniks-300': '/pdf/vulkan/Феникс 133-300 от 12.22.22.pdf',
  'feniks-1000': '/pdf/vulkan/Феникс 360-1000 от 25.11.22.pdf',
};

function getDocForUrl(url) {
  if (url.startsWith('kotel-vulkan-eko-max-duo-')) return docMap['vulkan-eko-max-duo'];
  if (url.startsWith('kotel-vulkan-eko-max-')) return docMap['vulkan-eko-max'];
  if (url.startsWith('kotel-vulkan-eko-')) return docMap['vulkan-eko'];
  if (url.startsWith('kotel-boss-')) return docMap['boss'];
  if (url.startsWith('kotel-green-eko-max-')) return docMap['green-eko-max'];
  if (url.startsWith('kotel-green-')) return docMap['green'];
  if (url.startsWith('kotel-optimum-')) return docMap['optimum'];
  if (url.startsWith('kotel-alpha-')) return docMap['alpha'];
  if (url.startsWith('kotel-red-')) return docMap['red'];
  if (url.startsWith('kotel-sigma-')) return docMap['sigma'];
  if (url.startsWith('kotel-feniks-')) {
    const num = parseInt(url.match(/(\d+)\//)?.[1]);
    if (num <= 100) return docMap['feniks-100'];
    if (num <= 300) return docMap['feniks-300'];
    return docMap['feniks-1000'];
  }
  return null;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (/const _categories/.test(line)) {
    inCatSection = true;
  }

  // Detect start of object
  if (/^\s*\{/.test(line) && !/^\s*\{\}/.test(line) && !inCatSection) {
    currentObjId = null;
    hasDocuments = false;
    startLineIdx = -1;
  }

  const idMatch = line.match(/^\s*id:\s*(\d+),/);
  if (idMatch && !inCatSection) {
    currentObjId = parseInt(idMatch[1]);
  }

  if (/^\s*documents:/.test(line)) {
    hasDocuments = true;
  }

  // Detect url line: after it, add documents if needed
  const urlMatch = line.match(/^\s*url:\s'([^']+)',/);
  if (urlMatch && !inCatSection && !hasDocuments) {
    const url = urlMatch[1];
    const docPath = getDocForUrl(url);
    if (docPath) {
      const indent = line.match(/^\s*/)[0];
      result.push(line);
      result.push(`${indent}  documents: '${docPath}',`);
      continue;
    }
  }

  result.push(line);
}

fs.writeFileSync(filePath, result.join('\n'), 'utf-8');
console.log('Done');