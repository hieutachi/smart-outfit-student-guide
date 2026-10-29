import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = await readFile(path.join(root, 'HUONG_DAN_NHOM_2_SMART_OUTFIT_RECOMMENDER.md'), 'utf8');
const html = await readFile(path.join(root, 'dist/index.html'), 'utf8');
assert.equal(await readFile(path.join(root, 'dist/huong-dan.md'), 'utf8'), source);
assert(!/SV 4|4 thành viên|[Cc]ả 4 người/.test(source), 'Old four-person assignment remains');
const sections = [...source.matchAll(/^## (\d+)\./gm)].map((match) => Number(match[1]));
assert.deepEqual(sections, Array.from({ length: 18 }, (_, index) => index));
assert.equal((source.match(/^```/gm) ?? []).length % 2, 0);
const examples = [...source.matchAll(/```json\n([\s\S]*?)\n```/g)].map((match) => JSON.parse(match[1]));
assert.equal(examples.length, 4);
const outfit = examples.find((example) => example.score_parts);
assert(Math.abs(outfit.score - (0.6 * outfit.score_parts.color + 0.4 * outfit.score_parts.style)) < 1e-9);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML id');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), `Missing anchor: ${match[1]}`);
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(https?:|data:)/.test(match[1])) continue;
  await access(path.join(root, 'dist', match[1]));
}
assert(!/<!-- (CONTENT|NAVIGATION) -->/.test(html));
assert(!/\/Users\/|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN.*PRIVATE KEY/.test(html + source));
assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
console.log(`PASS: 18 chapters, 3 student roles, ${examples.length} JSON examples, ${ids.length} unique anchors, matching download, local assets and no private-path leakage.`);
