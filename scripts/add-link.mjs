#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const [, , rawSlug, ...titleParts] = process.argv;

if (!rawSlug) {
  console.error('Usage: node scripts/add-link.mjs <slug> [title]');
  process.exit(1);
}

const slug = rawSlug
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

if (!slug) {
  console.error('Invalid slug. Use letters, numbers, and dashes.');
  process.exit(1);
}

const title = titleParts.join(' ').trim() || slug;
const root = process.cwd();
const publicDir = path.join(root, 'public');
const routeDir = path.join(publicDir, slug);
const routeFile = path.join(routeDir, 'index.html');
const indexFile = path.join(publicDir, 'index.html');

fs.mkdirSync(routeDir, { recursive: true });

if (!fs.existsSync(routeFile)) {
  fs.writeFileSync(routeFile, `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)} | Panji Online Router</title>
</head>
<body style="font-family:Inter,system-ui;padding:40px;line-height:1.5">
  <main>
    <h1>${escapeHtml(title)}</h1>
    <p>This page is published at <code>/${slug}/</code>.</p>
    <p><a href="/">Back to router home</a></p>
  </main>
</body>
</html>
`);
}

if (!fs.existsSync(indexFile)) {
  console.error('Missing public/index.html');
  process.exit(1);
}

let index = fs.readFileSync(indexFile, 'utf8');
const linkLine = `        <li><a href="/${slug}/">/${slug}/</a> — ${escapeHtml(title)}</li>`;

if (!index.includes(`href="/${slug}/"`)) {
  index = index.replace('        <!-- ROUTES:END -->', `${linkLine}\n        <!-- ROUTES:END -->`);
  fs.writeFileSync(indexFile, index);
}

console.log(`Route ready: public/${slug}/index.html`);

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
