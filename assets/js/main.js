import { initMenu } from "./menu.js";
import { applySiteContent } from "./features/site-content.js";
import { renderCatalog } from "./features/catalog.js";
import { renderMissions } from "./features/missions.js";
import { renderNavigation } from "./features/navigation.js";
import { applySiteLinks } from "./features/links.js";
import { products } from "../../data/products.js";
import { navigation } from "../../data/navigation.js";
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
  const loaded = await Promise.all(components.map(async component => {
    const mount = document.getElementById(component.mount) ||
      document.querySelector(`[data-component="${component.mount}"]`);
    if (!mount) return null;

    const response = await fetch(component.file);
    if (!response.ok) {
      throw new Error(`Gagal memuat ${component.file}: HTTP ${response.status}`);
    }
    return { mount, markup: await response.text() };
  }));

  for (const component of loaded) {
    if (component) component.mount.innerHTML = component.markup;
  }
}

try {
  await loadComponents();
  applySiteContent(site);
  renderNavigation(navigation);
  initMenu();
  renderCatalog(products);
  renderMissions(site.missions);
  applySiteLinks(site);

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
} catch (error) {
  console.error("Inisialisasi situs TCS gagal:", error);
  const main = document.getElementById("site-main");
  if (main) {
    main.innerHTML = '<section class="section"><div class="container"><h2>Halaman belum dapat dimuat</h2><p class="section-intro">Muat ulang halaman atau buka situs melalui hosting/server statis.</p></div></section>';
  }
}