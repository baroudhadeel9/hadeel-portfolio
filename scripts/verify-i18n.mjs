import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const arPath = path.join(projectRoot, 'data', 'locales', 'ar.json');
const enPath = path.join(projectRoot, 'data', 'locales', 'en.json');

function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`❌ Failed to read or parse ${filePath}:`, err.message);
    process.exit(1);
  }
}

function getKeyPaths(obj, prefix = '') {
  const paths = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      paths.push(...getKeyPaths(value, fullPath));
    } else {
      paths.push({ path: fullPath, value });
    }
  }
  return paths;
}

const arData = loadJson(arPath);
const enData = loadJson(enPath);

const arEntries = getKeyPaths(arData);
const enEntries = getKeyPaths(enData);

const arKeySet = new Set(arEntries.map((e) => e.path));
const enKeySet = new Set(enEntries.map((e) => e.path));

const missingInEn = [...arKeySet].filter((k) => !enKeySet.has(k));
const missingInAr = [...enKeySet].filter((k) => !arKeySet.has(k));

const emptyInAr = arEntries.filter((e) => typeof e.value === 'string' && e.value.trim() === '');
const emptyInEn = enEntries.filter((e) => typeof e.value === 'string' && e.value.trim() === '');

let hasErrors = false;

if (missingInEn.length > 0) {
  hasErrors = true;
  console.error('\n❌ Keys present in ar.json but MISSING in en.json:');
  missingInEn.forEach((k) => console.error(`  - ${k}`));
}

if (missingInAr.length > 0) {
  hasErrors = true;
  console.error('\n❌ Keys present in en.json but MISSING in ar.json:');
  missingInAr.forEach((k) => console.error(`  - ${k}`));
}

if (emptyInAr.length > 0) {
  hasErrors = true;
  console.error('\n⚠️ Empty string values in ar.json:');
  emptyInAr.forEach((e) => console.error(`  - ${e.path}`));
}

if (emptyInEn.length > 0) {
  hasErrors = true;
  console.error('\n⚠️ Empty string values in en.json:');
  emptyInEn.forEach((e) => console.error(`  - ${e.path}`));
}

if (hasErrors) {
  console.error('\n🚨 i18n Verification FAILED. Please sync keys between ar.json and en.json.\n');
  process.exit(1);
} else {
  console.log(`\n✅ i18n Verification PASSED: All ${arKeySet.size} translation keys match perfectly between ar.json and en.json!\n`);
  process.exit(0);
}
