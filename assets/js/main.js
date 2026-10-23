import { initMenu } from "./menu.js";
import { products } from "../../data/products.js";
import { site } from "../../data/site.js";

const components = [
  { mount: "site-header", file: "components/header.html" },
  { mount: "hero", file: "components/hero.html" },
  { mount: "overview", file: "components/overview.html" },
  { mount: "about", file: "components/about.html" },
  { mount: "products", file: "components/products.html" },
  { mount: "projects", file: "components/projects.html" },
  { mount: "technology", file: "components/technology.html" },
  { mount: "safety", file: "components/safety.html" },
  { mount: "updates", file: "components/updates.html" },
  { mount: "contact", file: "components/contact.html" },
  { mount: "site-footer", file: "components/footer.html" }
];

async function loadComponents() {
  for (const component of components) {
    const mount = document.getElementById(component.mount) || document.querySelector(`[data-component="${component.mount}"]`);
    if (!mount) continue;
    const response = await fetch(component.file);
    if (!response.ok) throw new Error(`Gagal memuat ${component.file}: HTTP ${response.status}`);
    mount.innerHTML = await response.text();
  }
}

function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;
  list.replaceChildren();
  for (const product of products) {
    const article = document.createElement("article");
    article.className = "product-card";
    const top = document.createElement("div");
    top.className = "product-top";
    const symbol = document.createElement("span");
    symbol.className = "product-symbol";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = product.symbol;
    const identity = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = product.name;
    const category = document.createElement("span");
    category.className = "product-label";
    category.textContent = product.category;
    identity.append(title, category);
    top.append(symbol, identity);
    const description = document.createElement("p");
    description.className = "card-copy";
    description.textContent = product.description;
    const status = document.createElement("span");
    status.className = "status-tag";
    status.textContent = product.status;
    article.append(top, description, status);
    list.append(article);
  }
}

function renderMissions() {
  const list = document.getElementById("mission-list");
  if (!list || !Array.isArray(site.missions)) return;
  list.replaceChildren();
  site.missions.forEach((mission, index) => {
    const article = document.createElement("article");
    article.className = "overview-card";
    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${mission.title}`;
    const description = document.createElement("p");
    description.className = "card-copy";
    description.textContent = mission.text;
    article.append(title, description);
    list.append(article);
  });
}

try {
  await loadComponents();
  initMenu();
  renderProducts();
  renderMissions();
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
} catch (error) {
  console.error("TCS site initialization failed:", error);
  const main = document.getElementById("site-main");
  if (main) main.innerHTML = '<section class="section"><div class="container"><h2>Halaman belum dapat dimuat</h2><p class="section-intro">Coba muat ulang halaman atau buka situs melalui hosting/server statis.</p></div></section>';
}