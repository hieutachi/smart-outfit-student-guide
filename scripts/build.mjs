import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { marked, Renderer } from 'marked';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = 'HUONG_DAN_NHOM_2_SMART_OUTFIT_RECOMMENDER.md';
const markdown = await readFile(path.join(root, source), 'utf8');
const tokens = marked.lexer(markdown);
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const headingId = (text) => {
  const number = text.match(/^(\d+(?:\.\d+)*)\./)?.[1];
  if (number) return `muc-${number.replaceAll('.', '-')}`;
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll('đ', 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};
const sections = tokens.filter((token) => token.type === 'heading' && token.depth === 2);
const navigation = sections.map((token) => {
  const number = token.text.match(/^\d+/)?.[0] ?? '';
  const label = token.text.replace(/^\d+\.\s*/, '');
  return `<a href="#${headingId(token.text)}"><span class="nav-number">${number.padStart(2, '0')}</span><span>${escape(label)}</span></a>`;
}).join('\n');
const renderer = new Renderer();
renderer.heading = function (token) {
  if (token.depth === 1) return '';
  const id = headingId(token.text);
  return `<h${token.depth} id="${id}"><a class="heading-link" href="#${id}">${this.parser.parseInline(token.tokens)}</a></h${token.depth}>\n`;
};
renderer.table = function (token) {
  return `<div class="table-scroll" tabindex="0" role="region" aria-label="Bảng trong tài liệu; có thể cuộn ngang">${Renderer.prototype.table.call(this, token)}</div>`;
};
const content = marked.parser(tokens, { renderer });
const template = await readFile(path.join(root, 'web/template.html'), 'utf8');
const html = template.replace('<!-- NAVIGATION -->', navigation).replace('<!-- CONTENT -->', content);
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/index.html'), html);
await copyFile(path.join(root, source), path.join(root, 'dist/huong-dan.md'));
for (const name of ['styles.css', 'app.js', 'favicon.svg']) {
  await copyFile(path.join(root, 'web', name), path.join(root, 'dist', name));
}
console.log(`Built dist/index.html with ${sections.length} sections from the canonical guide.`);
