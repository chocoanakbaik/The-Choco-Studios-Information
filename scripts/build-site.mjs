import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist");

const publicFiles = [
  "index.html",
  "404.html",
  "favicon.svg",
  "robots.txt",
  "sitemap.xml",
  "_headers"
];

const publicDirectories = [
  "assets",
  "components",
  "data",
  "products"
];

const requiredOutput = [
  ...publicFiles,
  "assets/js/main.js",
  "assets/js/diagnostics.js",
  "components/header.html",
  "components/products.html",
  "data/site.js",
  "data/navigation.js",
  "data/products.js",
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

for (const source of [...publicFiles, ...publicDirectories]) {
  if (!existsSync(path.join(root, source))) {
    throw new Error(`Sumber publik wajib tidak ditemukan: ${source}`);
  }
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of publicFiles) {
  copyFileSync(path.join(root, file), path.join(output, file));
}

for (const directory of publicDirectories) {
  cpSync(path.join(root, directory), path.join(output, directory), { recursive: true });
}

const missing = requiredOutput.filter(file => !existsSync(path.join(output, file)));
if (missing.length) {
  rmSync(output, { recursive: true, force: true });
  throw new Error("Hasil build tidak lengkap: " + missing.join(", "));
}

const forbiddenPaths = ["README.md", "package.json", "docs", "scripts", ".github", "netlify.toml"];
const leaked = forbiddenPaths.filter(file => existsSync(path.join(output, file)));
if (leaked.length) {
  rmSync(output, { recursive: true, force: true });
  throw new Error("File/ folder internal tidak boleh masuk hasil deploy: " + leaked.join(", "));
}

const htmlPages = [
  "index.html",
  "404.html",
  "products/choco-ai.html",
  "products/kasirkita.html",
  "products/chocobot-guardian.html",
  "products/privacy-guardian.html"
];
const htmlCount = htmlPages.filter(file => existsSync(path.join(output, file))).length;

console.log(`BUILD LULUS: ${requiredOutput.length} path wajib tersedia; ${htmlCount} halaman HTML utama terbit.`);
console.log("Isi deploy: assets, components, data, products, index, 404, favicon, robots, sitemap, dan headers.");
console.log("Dokumentasi, bank pertanyaan, script validasi, dan konfigurasi build tidak ikut diterbitkan.");
