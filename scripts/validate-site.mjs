import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const failures = [];
const pass = message => console.log("PASS", message);
const fail = message => failures.push(message);

function read(file) {
  const fullPath = path.join(root, file);
  if (!existsSync(fullPath)) {
    fail(`File tidak ditemukan: ${file}`);
    return "";
  }
  return readFileSync(fullPath, "utf8");
}

function walkFiles(dir, extensions) {
  const fullDir = path.join(root, dir);
  if (!existsSync(fullDir)) return [];
  const results = [];
  for (const item of readdirSync(fullDir, { withFileTypes: true })) {
    if (item.name === ".git" || item.name === "node_modules") continue;
    const relative = path.posix.join(dir, item.name);
    if (item.isDirectory()) results.push(...walkFiles(relative, extensions));
    else if (extensions.some(extension => item.name.endsWith(extension))) results.push(relative);
  }
  return results;
}

const requiredFiles = [
  "index.html",
  "package.json",
  "README.md",
  ".github/workflows/validate-site.yml",
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
if (failures.length === 0) pass(`${requiredFiles.length} file wajib tersedia`);

const index = read("index.html");
const main = read("assets/js/main.js");
const header = read("components/header.html");
const responsive = read("assets/css/responsive.css");
const menu = read("assets/js/menu.js");

if (!/<html\s+lang="id"/i.test(index)) fail("index.html harus menetapkan Bahasa Indonesia sebagai bahasa utama");
if (!/<title>[^<]+<\/title>/i.test(index)) fail("Judul halaman tidak ditemukan");
if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(index)) fail("Deskripsi metadata halaman tidak ditemukan");
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
if (!/event\.key === ["']Escape["']/.test(menu)) fail("Menu belum mendukung tombol Escape");
if (failures.length === 0) pass("Metadata, landmark aksesibilitas, dan kontrol menu diperiksa");

const componentFiles = [...main.matchAll(/file:\s*["']([^"']+\.html)["']/g)].map(match => match[1]);
const componentMounts = [...main.matchAll(/mount:\s*["']([^"']+)["']/g)].map(match => match[1]);

for (const file of componentFiles) {
  if (!existsSync(path.join(root, file))) fail(`Komponen yang dirujuk main.js tidak ditemukan: ${file}`);
}
for (const mount of componentMounts) {
  const existsAsId = index.includes(`id="${mount}"`);
  const existsAsPlaceholder = index.includes(`data-component="${mount}"`);
  if (!existsAsId && !existsAsPlaceholder) fail(`Titik pemasangan komponen tidak ditemukan di index.html: ${mount}`);
}
if (componentFiles.length !== 11 || componentMounts.length !== 11) {
  fail("Daftar komponen harus berisi tepat 11 komponen dengan 11 titik pemasangan");
} else if (failures.length === 0) {
  pass("11 komponen cocok dengan daftar dan titik pemasangan");
}

const htmlDocuments = [
  { file: "index.html", content: index },
  ...componentFiles.map(file => ({ file, content: read(file) }))
];
const allComponentMarkup = htmlDocuments.slice(1).map(document => document.content).join("\n");
const allMarkup = htmlDocuments.map(document => document.content).join("\n");
const idOwners = new Map();

for (const document of htmlDocuments) {
  for (const match of document.content.matchAll(/\bid="([^"]+)"/g)) {
    const id = match[1];
    if (idOwners.has(id)) {
      fail(`ID HTML duplikat #${id}: ${idOwners.get(id)} dan ${document.file}`);
    } else {
      idOwners.set(id, document.file);
    }
  }
}
const ids = new Set(idOwners.keys());
const anchorTargets = [
  ...[...allMarkup.matchAll(/\bhref="#([^"]+)"/g)].map(match => match[1]),
  ...[...allMarkup.matchAll(/\bdata-target="#([^"]+)"/g)].map(match => match[1])
].filter(Boolean);

for (const target of anchorTargets) {
  if (!ids.has(target)) fail(`Tautan jangkar tidak memiliki target: #${target}`);
}
for (const document of htmlDocuments) {
  for (const match of document.content.matchAll(/\baria-labelledby="([^"]+)"/g)) {
    for (const id of match[1].split(/\s+/).filter(Boolean)) {
      if (!ids.has(id)) fail(`aria-labelledby di ${document.file} merujuk ID yang tidak ada: #${id}`);
    }
  }
}
if (failures.length === 0) pass(`${ids.size} ID unik, target jangkar, dan referensi aria-labelledby diperiksa`);

for (const document of htmlDocuments) {
  for (const match of document.content.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const target = match[1].trim();
    if (!target || target.startsWith("#") || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue;
    const relativeTarget = target.split(/[?#]/, 1)[0];
    if (!relativeTarget) continue;
    const resolved = path.resolve(path.dirname(path.join(root, document.file)), relativeTarget);
    if (!existsSync(resolved)) fail(`Aset atau tautan lokal tidak ditemukan di ${document.file}: ${target}`);
  }
}
if (failures.length === 0) pass("Seluruh sumber lokal di href/src tersedia");

let site;
let navigation;
let products;
try {
  const siteModule = await import(pathToFileURL(path.join(root, "data/site.js")).href);
  const navigationModule = await import(pathToFileURL(path.join(root, "data/navigation.js")).href);
  const productsModule = await import(pathToFileURL(path.join(root, "data/products.js")).href);
  site = siteModule.site;
  navigation = navigationModule.navigation;
  products = productsModule.products;
} catch (error) {
  fail(`Modul data situs tidak dapat dimuat: ${error.message}`);
}

if (site && navigation && products) {
  if (!/^\S+@\S+\.\S+$/.test(site.email || "")) fail("Alamat email di data/site.js tidak valid");
  for (const key of ["chocoAiUrl", "helpCenterUrl", "contactFormUrl"]) {
    try {
      const url = new URL(site[key]);
      if (url.protocol !== "https:") fail(`Tautan ${key} harus menggunakan HTTPS`);
    } catch {
      fail(`Tautan konfigurasi belum valid: ${key}`);
    }
  }

  if (!Array.isArray(site.missions) || site.missions.length === 0) {
    fail("data/site.js harus memiliki daftar misi");
  } else {
    site.missions.forEach((mission, index) => {
      if (!mission?.title?.trim() || !mission?.text?.trim()) {
        fail(`Misi nomor ${index + 1} harus memiliki judul dan deskripsi`);
      }
    });
  }

  if (!Array.isArray(navigation) || navigation.length === 0) {
    fail("data/navigation.js harus memiliki item navigasi");
  } else {
    const labels = new Set();
    navigation.forEach((item, index) => {
      if (!item?.label?.trim() || !item?.href?.trim()) {
        fail(`Item navigasi nomor ${index + 1} tidak lengkap`);
        return;
      }
      if (labels.has(item.label)) fail(`Label navigasi duplikat: ${item.label}`);
      labels.add(item.label);
      if (!["primary", "secondary"].includes(item.group)) {
        fail(`Kelompok navigasi tidak dikenal untuk: ${item.label}`);
      }
      if (!item.href.startsWith("#") || !ids.has(item.href.slice(1))) {
        fail(`Target navigasi tidak tersedia untuk ${item.label}: ${item.href}`);
      }
    });
  }

  if (!Array.isArray(products) || products.length === 0) {
    fail("data/products.js harus memiliki minimal satu produk");
  } else {
    const names = new Set();
    products.forEach((product, index) => {
      for (const field of ["name", "category", "symbol", "status", "description"]) {
        if (typeof product?.[field] !== "string" || !product[field].trim()) {
          fail(`Produk nomor ${index + 1} belum memiliki field ${field}`);
        }
      }
      if (product?.name && names.has(product.name)) fail(`Nama produk duplikat: ${product.name}`);
      if (product?.name) names.add(product.name);
    });
  }

  for (const match of allComponentMarkup.matchAll(/data-link-key=["']([^"']+)["']/g)) {
    if (typeof site[match[1]] !== "string" || !site[match[1]].trim()) {
      fail(`Kunci data-link-key tidak ada atau kosong di data/site.js: ${match[1]}`);
    }
  }
  if (failures.length === 0) pass("URL, data misi, navigasi, katalog, dan kunci tautan valid");
}

const jsFiles = walkFiles(".", [".js", ".mjs", ".cjs"]);
for (const file of jsFiles) {
  const content = read(file);
  for (const match of content.matchAll(/\bfrom\s*["']([^"']+)["']/g)) {
    const specifier = match[1];
    if (!specifier.startsWith("./") && !specifier.startsWith("../")) continue;
    const resolved = path.resolve(path.dirname(path.join(root, file)), specifier);
    if (!existsSync(resolved)) fail(`Impor lokal tidak ditemukan dari ${file}: ${specifier}`);
  }
  for (const match of content.matchAll(/\bimport\s*["']([^"']+)["']/g)) {
    const specifier = match[1];
    if (!specifier.startsWith("./") && !specifier.startsWith("../")) continue;
    const resolved = path.resolve(path.dirname(path.join(root, file)), specifier);
    if (!existsSync(resolved)) fail(`Impor lokal tidak ditemukan dari ${file}: ${specifier}`);
  }

  const result = spawnSync(process.execPath, ["--check", file], {
    cwd: root,
    encoding: "utf8"
  });
  if (result.status !== 0) {
    fail(`Sintaks JavaScript gagal: ${file}\n${result.stderr || result.stdout}`);
  }
}
if (failures.length === 0) pass(`Sintaks dan impor ${jsFiles.length} berkas JavaScript diperiksa`);

const markdownFiles = walkFiles("docs", [".md"]);
for (const doc of markdownFiles) {
  const content = read(doc);
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("//")) continue;
    const resolved = path.resolve(path.dirname(path.join(root, doc)), target);
    if (!existsSync(resolved)) fail(`Tautan dokumentasi rusak pada ${doc}: ${target}`);
  }
}
if (failures.length === 0) pass(`Tautan relatif di ${markdownFiles.length} dokumen Markdown diperiksa`);

if (failures.length) {
  console.error("\nVALIDASI GAGAL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nVALIDASI LULUS: struktur, HTML, aksesibilitas dasar, data situs, aset lokal, impor, dan dokumentasi telah diperiksa.");
}
