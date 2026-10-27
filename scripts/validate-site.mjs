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
    if (item.name === ".git" || item.name === "node_modules" || item.name === "dist" || item.name === ".netlify") continue;
    const relative = path.posix.join(dir, item.name);
    if (item.isDirectory()) results.push(...walkFiles(relative, extensions));
    else if (extensions.some(extension => item.name.endsWith(extension))) results.push(relative);
  }
  return results;
}

const requiredFiles = [
  "index.html",
  "404.html",
  "products/choco-ai.html",
  "products/kasirkita.html",
  "products/chocobot-guardian.html",
  "products/privacy-guardian.html",
  "products/choco-ai-help-center.html",
  "products/chocoscan.html",
  "products/tcs-umkm-stock-sales-tracker.html",
  "products/tcs-business-document-kit.html",
  "products/tcs-professional-cv-kit.html",
  "products/tcs-social-media-business-kit.html",
  "products/tcs-business-presentation-kit.html",
  "products/tcs-finance-cashflow-pro.html",
  "products/tcs-umkm-website-kit.html",
  "products/tcs-admin-dashboard-ui-kit.html",
  "products/tcs-business-management-system.html",
  "products/tcs-complete-umkm-suite.html",
  "favicon.svg",
  "robots.txt",
  "_headers",
  "netlify.toml",
  ".gitignore",
  "package.json",
  "README.md",
  "scripts/build-site.mjs",
  "scripts/validate-site.mjs",
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
  "assets/css/diagnostics.css",
  "assets/css/product-pages.css",
  "assets/css/responsive.css",
  "assets/js/diagnostics.js",
  "assets/js/main.js",
  "assets/js/menu.js",
  "assets/js/features/catalog.js",
  "assets/js/features/links.js",
  "assets/js/features/missions.js",
  "assets/js/features/navigation.js",
  "assets/js/features/active-navigation.js",
  "assets/js/features/site-content.js",
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

const productPageFiles = [
  "products/choco-ai.html",
  "products/kasirkita.html",
  "products/chocobot-guardian.html",
  "products/privacy-guardian.html",
  "products/choco-ai-help-center.html",
  "products/chocoscan.html",
  "products/tcs-umkm-stock-sales-tracker.html",
  "products/tcs-business-document-kit.html",
  "products/tcs-professional-cv-kit.html",
  "products/tcs-social-media-business-kit.html",
  "products/tcs-business-presentation-kit.html",
  "products/tcs-finance-cashflow-pro.html",
  "products/tcs-umkm-website-kit.html",
  "products/tcs-admin-dashboard-ui-kit.html",
  "products/tcs-business-management-system.html",
  "products/tcs-complete-umkm-suite.html"
];

for (const file of requiredFiles) {
  if (!existsSync(path.join(root, file))) fail(`File wajib hilang: ${file}`);
}
if (failures.length === 0) pass(`${requiredFiles.length} file wajib tersedia`);

const index = read("index.html");
const packageJson = read("package.json");
const netlifyConfig = read("netlify.toml");
const buildScript = read("scripts/build-site.mjs");
const custom404 = read("404.html");
const robots = read("robots.txt");
const headers = read("_headers");
const catalog = read("assets/js/features/catalog.js");
const productPages = productPageFiles.map(file => ({ file, content: read(file) }));
const main = read("assets/js/main.js");
const diagnostics = read("assets/js/diagnostics.js");
const diagnosticStyles = read("assets/css/diagnostics.css");
const header = read("components/header.html");
const responsive = read("assets/css/responsive.css");
const componentStyles = read("assets/css/components.css");
const menu = read("assets/js/menu.js");

if (!netlifyConfig.includes('command = "npm run build"') ||
    !netlifyConfig.includes('publish = "dist"')) {
  fail("netlify.toml harus menjalankan build dan menerbitkan folder dist");
}
if (!packageJson.includes('"build": "node scripts/build-site.mjs"')) {
  fail("package.json belum menyediakan perintah build produksi");
}
for (const token of [
  '"index.html"', '"404.html"', '"favicon.svg"', '"robots.txt"', '"_headers"',
  '"assets"', '"components"', '"data"', '"products"',
  '"README.md"', '"docs"', '"scripts"', '".github"'
]) {
  if (!buildScript.includes(token)) fail("Daftar salin/pengecualian build tidak memiliki token yang diharapkan: " + token);
}
if (!buildScript.includes("BUILD LULUS") ||
    !buildScript.includes("File/ folder internal tidak boleh masuk hasil deploy")) {
  fail("Build produksi belum memeriksa kelengkapan output dan pengecualian file internal");
}
if (failures.length === 0) pass("Konfigurasi Netlify dan batas file produksi diperiksa");

if (!/<html\s+lang="id"/i.test(index)) fail("index.html harus menetapkan Bahasa Indonesia sebagai bahasa utama");
if (!/<title>[^<]+<\/title>/i.test(index)) fail("Judul halaman tidak ditemukan");
if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(index)) fail("Deskripsi metadata halaman tidak ditemukan");
const hasMeta = key => new RegExp(`<meta\\s+(?:name|property)="${key}"\\s+content="[^"]+"`, "i").test(index);
for (const key of ["og:site_name", "og:title", "og:description", "og:type", "og:locale", "twitter:card", "twitter:title", "twitter:description"]) {
  if (!hasMeta(key)) fail(`Metadata pratinjau tautan tidak ditemukan: ${key}`);
}
if (!index.includes('<link rel="icon" type="image/svg+xml" href="favicon.svg">')) {
  fail("Favicon SVG tidak ditautkan dari index.html");
}
if (!custom404.includes("<title>404 — Halaman Tidak Ditemukan | The Choco Studios</title>") ||
    !custom404.includes("<h1>Halaman tidak ditemukan</h1>") ||
    !custom404.includes('<a class="primary" href="/">Kembali ke beranda</a>') ||
    !custom404.includes('href="/favicon.svg"') ||
    !custom404.includes('name="robots" content="noindex,follow"')) {
  fail("Halaman 404 harus punya judul, pesan, ikon, tombol kembali, dan noindex");
}
for (const header of ["X-Content-Type-Options: nosniff", "Referrer-Policy: strict-origin-when-cross-origin", "X-Frame-Options: DENY", "Permissions-Policy: camera=(), microphone=(), geolocation=()"]) {
  if (!headers.includes(header)) fail(`Header keamanan dasar tidak ditemukan: ${header}`);
}
if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) {
  fail("robots.txt belum memiliki aturan perayapan dasar");
}
if (!catalog.includes("product.detailsUrl") || !catalog.includes('textContent = "Lihat detail"')) {
  fail("Kartu produk belum menyediakan tautan ke halaman detail");
}
for (const document of productPages) {
  const content = document.content;
  if (!/<html\s+lang="id"/i.test(content) ||
      !/<title>[^<]+<\/title>/i.test(content) ||
      !/<meta\s+name="description"\s+content="[^"]+"/i.test(content) ||
      !content.includes('property="og:title"') ||
      !content.includes('name="twitter:card"') ||
      !content.includes('rel="stylesheet" href="../assets/css/product-pages.css"') ||
      !content.includes('href="../favicon.svg"') ||
      !content.includes('class="skip-link" href="#main"') ||
      !content.includes('id="main"')) {
    fail("Metadata, stylesheet, favicon, atau aksesibilitas dasar tidak lengkap: " + document.file);
  }
  if (/<script\b/i.test(content)) fail("Halaman detail produk seharusnya dapat dibaca tanpa JavaScript: " + document.file);
  const pageIds = new Set();
  for (const match of content.matchAll(/\bid="([^"]+)"/g)) {
    if (pageIds.has(match[1])) fail("ID HTML duplikat pada " + document.file + ": #" + match[1]);
    pageIds.add(match[1]);
  }
  for (const match of content.matchAll(/\baria-labelledby="([^"]+)"/g)) {
    for (const id of match[1].split(/\s+/).filter(Boolean)) {
      if (!pageIds.has(id)) fail("aria-labelledby merujuk ID yang tidak ada pada " + document.file + ": #" + id);
    }
  }
  for (const match of content.matchAll(/\b(?:href|src)=[\"']([^\"']+)[\"']/g)) {
    const target = match[1].trim();
    if (!target || target.startsWith("#")) {
      if (target.startsWith("#") && !pageIds.has(target.slice(1))) {
        fail("Tautan jangkar internal tidak memiliki target di " + document.file + ": " + target);
      }
      continue;
    }
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue;
    const localTarget = target.split(/[?#]/, 1)[0];
    if (!localTarget) continue;
    const resolved = path.resolve(path.dirname(path.join(root, document.file)), localTarget);
    if (!existsSync(resolved)) fail("Referensi lokal tidak ditemukan pada " + document.file + ": " + target);
  }
}
if (!/id="site-main"/.test(index)) fail("Landmark konten utama #site-main tidak ditemukan");
if (!/class="skip-link"\s+href="#site-main"/.test(index)) fail("Tautan lewati ke konten utama tidak ditemukan");
if (!/id="site-nav"/.test(header) || !/aria-controls="site-nav"/.test(header)) {
  fail("Kontrol menu tidak terhubung dengan elemen navigasi");
}
if (!/renderNavigation\(navigation\)/.test(main)) fail("Data navigasi belum dirender oleh main.js");
if (!main.includes("const initialHash = window.location.hash.slice(1)") || !main.includes("initialTarget.scrollIntoView")) {
  fail("Tautan anchor dari halaman detail belum dipulihkan setelah komponen dimuat");
}
if (!/import\s*\{\s*initActiveNavigation\s*\}\s*from\s*"\.\/features\/active-navigation\.js"/.test(main) ||
    !/initActiveNavigation\(\)/.test(main)) {
  fail("Perilaku navigasi aktif belum dihubungkan di main.js");
}
if (!/import\s*\{\s*applySiteContent\s*\}\s*from\s*"\.\/features\/site-content\.js"/.test(main) ||
    !/applySiteContent\(site\)/.test(main)) {
  fail("Konten berbasis data belum diterapkan setelah komponen dimuat");
}
if (!/import\s*\{\s*navigation\s*\}\s*from\s*["']\.\.\/\.\.\/data\/navigation\.js["']/.test(main)) {
  fail("main.js belum mengimpor data/navigation.js");
}
if (index.indexOf('src="assets/js/diagnostics.js"') < 0 ||
    index.indexOf('src="assets/js/diagnostics.js"') > index.indexOf('src="assets/js/main.js"')) {
  fail("Diagnostik global harus dimuat sebelum modul aplikasi");
}
if (!diagnostics.includes("window.TCSDiagnostics") ||
    !diagnostics.includes('addEventListener("unhandledrejection"') ||
    !diagnostics.includes('addEventListener("error"')) {
  fail("Diagnostik belum menangani error client global dan Promise yang gagal");
}
if (!diagnostics.includes('Respons server (HTTP "') || !diagnostics.includes("status >= 500") ||
    !diagnostics.includes("NO_HTTP_RESPONSE") || !diagnostics.includes("SERVER_HTTP") ||
    !diagnostics.includes("CLIENT_RUNTIME")) {
  fail("Klasifikasi client, HTTP server, dan koneksi belum lengkap");
}
if (!diagnosticStyles.includes(".diagnostic-panel[hidden] { display: none; }") ||
    !diagnosticStyles.includes(".diagnostic-fields") ||
    !diagnosticStyles.includes(".diagnostic-stack") ||
    !diagnosticStyles.includes(".diagnostic-actions") ||
    !diagnosticStyles.includes(".diagnostic-copy-status")) {
  fail("Gaya panel detail diagnostik belum lengkap");
}
if (!diagnostics.includes("navigator.clipboard.writeText") || !diagnostics.includes("Salin laporan")) {
  fail("Laporan diagnostik belum bisa disalin secara eksplisit oleh pengguna");
}
if (!diagnostics.includes('code: "HTTP_NOT_FOUND"') ||
    !diagnostics.includes('code: "HTTP_ACCESS"') ||
    !diagnostics.includes('code: "HTTP_RATE_LIMIT"') ||
    !diagnostics.includes('code: "HTTP_TIMEOUT"')) {
  fail("Pemeriksaan belum memiliki rincian untuk HTTP 404, 401/403, 429, dan 408");
}
if (!main.includes("window.TCSDiagnostics") ||
    !main.includes("reportDiagnostic") ||
    !main.includes("loadComponents")) {
  fail("Alur pemuatan komponen belum terhubung ke pelaporan diagnostik");
}
if (failures.length === 0) pass("Pelaporan detail error client, HTTP, dan koneksi dikonfigurasi");

if (!responsive.includes("@media (max-width: 1040px)") ||
    !responsive.includes(".nav.open { display: flex; }") ||
    !responsive.includes(".nav .nav-secondary { display: block; }")) {
  fail("Navigasi responsif tidak memenuhi pemeriksaan breakpoint tablet");
}
if (!/window\.innerWidth\s*>\s*1040/.test(menu)) fail("Breakpoint menu.js tidak sinkron dengan CSS");
if (!/event\.key === ["']Escape["']/.test(menu)) fail("Menu belum mendukung tombol Escape");
if (!header.includes('class="menu-icon-lines"') || !header.includes('class="menu-icon-close"') ||
    !componentStyles.includes('.menu-toggle[aria-expanded="true"] .menu-icon-close { display: block; }')) {
  fail("Ikon menu tidak mengikuti status aria-expanded");
}
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
    // Komponen dimasukkan ke DOM index.html; URL relatifnya dihitung dari URL halaman utama,
    // bukan dari lokasi file komponen di dalam repo.
    const sourceDirectory = document.file.startsWith("components/")
      ? root
      : path.dirname(path.join(root, document.file));
    const resolved = path.resolve(sourceDirectory, relativeTarget);
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
      for (const field of ["name", "category", "symbol", "status", "description", "detailsUrl"]) {
        if (typeof product?.[field] !== "string" || !product[field].trim()) {
          fail(`Produk nomor ${index + 1} belum memiliki field ${field}`);
        }
      }
      if (product?.name && names.has(product.name)) fail(`Nama produk duplikat: ${product.name}`);
      if (product?.name) names.add(product.name);
      if (product?.detailsUrl && !existsSync(path.join(root, product.detailsUrl))) {
        fail("Halaman detail tidak ditemukan untuk produk " + product.name + ": " + product.detailsUrl);
      }
    });
    for (const page of productPageFiles) {
      if (!products.some(product => product?.detailsUrl === page)) {
        fail("Halaman detail belum terhubung dari data/products.js: " + page);
      }
    }
  }

  for (const match of allComponentMarkup.matchAll(/data-link-key=["']([^"']+)["']/g)) {
    if (typeof site[match[1]] !== "string" || !site[match[1]].trim()) {
      fail(`Kunci data-link-key tidak ada atau kosong di data/site.js: ${match[1]}`);
    }
  }

  const getSiteValue = key => key.split(".").reduce((value, part) => value?.[part], site);
  for (const match of allComponentMarkup.matchAll(/data-site-text="([^"]+)"/g)) {
    const value = getSiteValue(match[1]);
    if (typeof value !== "string" && typeof value !== "number") {
      fail("Kunci data-site-text tidak ada atau bukan teks di data/site.js: " + match[1]);
    }
  }
  for (const match of allComponentMarkup.matchAll(/data-site-list="([^"]+)"/g)) {
    const value = getSiteValue(match[1]);
    if (!Array.isArray(value) || !value.every(item => typeof item === "string")) {
      fail("Kunci data-site-list harus berupa daftar teks di data/site.js: " + match[1]);
    }
  }

  for (const match of allComponentMarkup.matchAll(/data-link-text="([^"]+)"/g)) {
    const value = getSiteValue(match[1]);
    if (typeof value !== "string" || !value.trim()) {
      fail("Kunci data-link-text tidak ada atau kosong di data/site.js: " + match[1]);
    }
  }

  if (typeof site.phoneDisplay !== "string" || !/^[0-9]{8,15}$/.test(site.phoneDisplay)) {
    fail("Nomor tampilan telepon tidak valid di data/site.js");
  }
  if (typeof site.phoneUrl !== "string" || !/^tel:\+[0-9]{8,15}$/.test(site.phoneUrl)) {
    fail("URL telepon harus memakai skema tel: dan nomor internasional");
  }

  if (failures.length === 0) pass("URL, data misi, navigasi, katalog, konten dinamis dan kunci tautan valid");
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


const questionFiles = walkFiles("docs/questions", [".md"]);
const questionTopics = questionFiles.filter(file => file !== "docs/questions/README.md");
const questionIndexes = ["docs/questionnaire.md", "docs/questions/README.md"];
const questionIdOwners = new Map();

function indexContainsTopic(indexFile, targetFile) {
  const source = read(indexFile);
  for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("//")) continue;
    const resolved = path.resolve(path.dirname(path.join(root, indexFile)), target);
    if (resolved === path.resolve(root, targetFile)) return true;
  }
  return false;
}

for (const topic of questionTopics) {
  const source = read(topic);
  const matches = [...source.matchAll(/\*\*([A-Z]{2,4}-\d{2,}):?\*\*/g)];
  if (matches.length === 0) fail("Bank pertanyaan tidak memiliki ID pertanyaan: " + topic);

  for (const match of matches) {
    const id = match[1];
    const lineStart = source.lastIndexOf("\n", match.index) + 1;
    const prefix = source.slice(lineStart, match.index);
    if (!/^\s*-\s+\[(?:x|NANTI| )\]\s*$/.test(prefix)) {
      fail("Status pertanyaan harus berupa [x], [ ], atau [NANTI]: " + id + " di " + topic);
    }
    if (questionIdOwners.has(id)) {
      fail("ID pertanyaan duplikat " + id + " di " + questionIdOwners.get(id) + " dan " + topic);
    } else {
      questionIdOwners.set(id, topic);
    }
  }

  for (const indexFile of questionIndexes) {
    if (!indexContainsTopic(indexFile, topic)) {
      fail("File kategori belum ditautkan dari " + indexFile + ": " + topic);
    }
  }
}
if (questionTopics.length === 0) fail("Bank pertanyaan tidak memiliki file kategori");
if (failures.length === 0) pass(questionIdOwners.size + " ID pertanyaan unik dan " + questionTopics.length + " kategori terindeks di kedua indeks");

if (failures.length) {
  console.error("\nVALIDASI GAGAL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\nVALIDASI LULUS: struktur, HTML, aksesibilitas dasar, data situs, aset lokal, impor, dan dokumentasi telah diperiksa.");
}
