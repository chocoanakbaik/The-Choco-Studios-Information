import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const failures = [];
const pass = message => console.log("PASS", message);
const fail = message => failures.push(message);
const read = file => {
  const fullPath = path.join(root, file);
  if (!existsSync(fullPath)) {
    fail(`File tidak ditemukan: ${file}`);
    return "";
  }
  return readFileSync(fullPath, "utf8");
};

const requiredFiles = [
  "index.html",
  "package.json",
  "README.md",
  "components/header.html",
  "components/hero.html",
  "components/overview.html",
  "components/about.html",
  "components/products.html",
  "components/projects.html",
  "components/technology.html",
  "components/safety.html",
  "components/updates.html",
  "components/contact.html",
  "components/footer.html",
  "assets/css/tokens.css",
  "assets/css/base.css",
  "assets/css/layout.css",
  "assets/css/components.css",
  "assets/css/responsive.css",
  "assets/js/main.js",
  "assets/js/menu.js",
  "assets/js/features/catalog.js",
  "assets/js/features/links.js",
  "assets/js/features/missions.js",
  "assets/js/features/navigation.js",
  "data/site.js",
  "data/navigation.js",
  "data/products.js",
  "docs/content-plan.md",
  "docs/questionnaire.md",
  "docs/questions/README.md",
  "docs/questions/identity-branding.md",
  "docs/questions/products-projects.md",
  "docs/questions/data-privacy-security.md",
  "docs/questions/support-contact.md",
  "docs/questions/design-accessibility.md",
  "docs/questions/legal-licensing.md",
  "docs/questions/updates-maintenance.md"
];

for (const file of requiredFiles) {
  if (!existsSync(path.join(root, file))) fail(`File wajib hilang: ${file}`);
}
if (!failures.length) pass(`${requiredFiles.length} file wajib tersedia`);

const index = read("index.html");
const main = read("assets/js/main.js");
const header = read("components/header.html");
const responsive = read("assets/css/responsive.css");
const menu = read("assets/js/menu.js");
const navigationData = read("data/navigation.js");
const siteData = read("data/site.js");

if (!/<html\s+lang="id"/i.test(index)) fail("index.html harus menetapkan Bahasa Indonesia sebagai bahasa utama");
if (!/id="site-main"/.test(index)) fail("Landmark konten utama #site-main tidak ditemukan");
if (!/class="skip-link"\s+href="#site-main"/.test(index)) fail("Tautan lewati ke konten utama tidak ditemukan");
if (!/id="site-nav"/.test(header) || !/aria-controls="site-nav"/.test(header)) {
  fail("Kontrol menu tidak terhubung dengan elemen navigasi");
}
if (!/renderNavigation\(navigation\)/.test(main)) fail("Data navigasi belum dirender oleh main.js");
if (!/import\s*\{\s*navigation\s*\}\s*from\s*["']\.\.\/\.\.\/data\/navigation\.js["']/.test(main)) {
  fail("main.js belum mengimpor data/navigation.js");
}
if (!responsive.includes("@media (max-width: 1040px)") ||
    !responsive.includes(".nav.open { display: flex; }") ||
    !responsive.includes(".nav .nav-secondary { display: block; }")) {
  fail("Navigasi responsif tidak memenuhi pemeriksaan breakpoint tablet");
}
if (!/window\.innerWidth\s*>\s*1040/.test(menu)) fail("Breakpoint menu.js tidak sinkron dengan CSS");

const componentFiles = [...main.matchAll(/file:\s*["']([^"']+\.html)["']/g)].map(match => match[1]);
for (const file of componentFiles) {
  if (!existsSync(path.join(root, file))) fail(`Komponen yang dirujuk main.js tidak ditemukan: ${file}`);
}
const componentMounts = [...main.matchAll(/mount:\s*["']([^"']+)["']/g)].map(match => match[1]);
for (const mount of componentMounts) {
  const existsAsId = index.includes(`id="${mount}"`);
  const existsAsPlaceholder = index.includes(`data-component="${mount}"`);
  if (!existsAsId && !existsAsPlaceholder) fail(`Titik pemasangan komponen tidak ditemukan di index.html: ${mount}`);
}
if (componentFiles.length === 11 && componentMounts.length === 11) {
  pass("11 komponen cocok dengan daftar dan titik pemasangan di index.html");
}

const allComponentMarkup = componentFiles.map(read).join("\n");
const ids = new Set([
  ...[...index.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]),
  ...[...allComponentMarkup.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
]);
const hrefs = [
  ...[...allComponentMarkup.matchAll(/\bhref="#([^"]+)"/g)].map(match => match[1]),
  ...[...navigationData.matchAll(/href:\s*["']#([^"']+)["']/g)].map(match => match[1])
].filter(target => target && target !== "#");
for (const target of hrefs) {
  if (!ids.has(target)) fail(`Tautan jangkar tidak memiliki target: #${target}`);
}
if (hrefs.length) pass(`${hrefs.length} referensi jangkar diperiksa`);

const siteKeys = new Set([...siteData.matchAll(/^\s*([A-Za-z_$][\w$]*):/gm)].map(match => match[1]));
for (const match of allComponentMarkup.matchAll(/data-link-key=["']([^"']+)["']/g)) {
  if (!siteKeys.has(match[1])) fail(`Kunci data-link-key tidak ada di data/site.js: ${match[1]}`);
}
for (const key of ["chocoAiUrl", "helpCenterUrl", "contactFormUrl"]) {
  const pattern = new RegExp(`\\b${key}:\\s*["']https?:\\/\\/`);
  if (!pattern.test(siteData)) fail(`Tautan konfigurasi belum lengkap: ${key}`);
}
if (failures.length === 0) pass("Kunci tautan dan konfigurasi situs cocok");

for (const doc of ["docs/questionnaire.md", "docs/questions/README.md"]) {
  const content = read(doc);
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^[a-z]+:\/\//i.test(target) || target.startsWith("mailto:")) continue;
    const resolved = path.resolve(path.dirname(path.join(root, doc)), target);
    if (!existsSync(resolved)) fail(`Tautan dokumentasi rusak pada ${doc}: ${target}`);
  }
}
if (failures.length === 0) pass("Tautan pada indeks bank pertanyaan valid");

function walk(dir) {
  const results = [];
  for (const item of readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (item.name === ".git" || item.name === "node_modules") continue;
    const relative = path.posix.join(dir, item.name);
    if (item.isDirectory()) results.push(...walk(relative));
    else if (/\.(?:js|mjs|cjs)$/.test(item.name)) results.push(relative);
  }
  return results;
}

for (const file of walk(".")) {
  const result = spawnSync(process.execPath, ["--check", file], {
    cwd: root,
    encoding: "utf8"
  });
  if (result.status !== 0) {
    fail(`Sintaks JavaScript gagal: ${file}\n${result.stderr || result.stdout}`);
  }
}
if (failures.length === 0) pass("Sintaks seluruh berkas JavaScript valid");

if (failures.length) {
  console.error("\nVALIDASI GAGAL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nVALIDASI LULUS: struktur statis, navigasi, tautan, dan sintaks telah diperiksa.");
}