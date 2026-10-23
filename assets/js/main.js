import { initMenu } from "./menu.js";
import { applySiteContent } from "./features/site-content.js";
import { renderCatalog } from "./features/catalog.js";
import { renderMissions } from "./features/missions.js";
import { renderNavigation } from "./features/navigation.js";
import { initActiveNavigation } from "./features/active-navigation.js";
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

function createLoadError(message, details = {}) {
  const error = new Error(message, details.cause ? { cause: details.cause } : undefined);
  error.tcsFailureKind = details.kind || "client";
  error.tcsResource = details.resource || "";
  error.tcsStatus = details.status || "";
  error.tcsStatusText = details.statusText || "";
  return error;
}

function reportDiagnostic(error, source = "assets/js/main.js") {
  if (error?.tcsDiagnosticReported) return;
  const reporter = window.TCSDiagnostics;
  if (reporter && typeof reporter.report === "function") {
    reporter.report({
      kind: error?.tcsFailureKind || "client",
      status: error?.tcsStatus || "",
      statusText: error?.tcsStatusText || "",
      source,
      resource: error?.tcsResource || "",
      error
    });
  } else {
    console.error("[TCS] Diagnostik belum tersedia.", { source, error });
  }
  if (error && typeof error === "object") error.tcsDiagnosticReported = true;
}

async function loadComponents() {
  const loaded = await Promise.all(components.map(async component => {
    const mount = document.getElementById(component.mount) ||
      document.querySelector(`[data-component="${component.mount}"]`);
    if (!mount) {
      return {
        component,
        error: createLoadError(
          `Titik pemasangan komponen tidak ditemukan: ${component.mount}`,
          { resource: component.file }
        )
      };
    }

    try {
      const response = await fetch(component.file);
      if (!response.ok) {
        throw createLoadError(
          `Gagal memuat ${component.file}: HTTP ${response.status} ${response.statusText}`.trim(),
          {
            kind: "http",
            status: response.status,
            statusText: response.statusText,
            resource: component.file
          }
        );
      }

      const markup = await response.text();
      return { component, mount, markup };
    } catch (error) {
      const failure = error?.tcsFailureKind
        ? error
        : createLoadError(
          `Permintaan ke ${component.file} gagal sebelum respons berhasil dibaca: ${error?.message || String(error)}`,
          { kind: error instanceof TypeError ? "network" : "client", resource: component.file, cause: error }
        );
      reportDiagnostic(failure, "assets/js/main.js · loadComponents");
      return { component, error: failure };
    }
  }));

  const failures = loaded.filter(item => item?.error);
  if (failures.length) {
    for (const item of failures) {
      reportDiagnostic(item.error, "assets/js/main.js · memuat " + item.component.file);
    }
    const firstError = failures[0].error;
    const aggregate = createLoadError(
      `${failures.length} dari ${components.length} komponen halaman gagal dimuat. Buka panel diagnostik untuk melihat rincian setiap kegagalan.`,
      { resource: failures.map(item => item.component.file).join(", "), cause: firstError }
    );
    aggregate.tcsDiagnosticReported = true;
    throw aggregate;
  }

  for (const item of loaded) item.mount.innerHTML = item.markup;
}

try {
  await loadComponents();
  applySiteContent(site);
  renderNavigation(navigation);
  initMenu();
  initActiveNavigation();
  renderCatalog(products);
  renderMissions(site.missions);
  applySiteLinks(site);

  // Navigasi ke anchor dari halaman detail harus menunggu komponen berisi target selesai dimuat.
  const initialHash = window.location.hash.slice(1);
  const initialTarget = initialHash ? document.getElementById(initialHash) : null;
  if (initialTarget) initialTarget.scrollIntoView({ block: "start" });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
} catch (error) {
  reportDiagnostic(error, "assets/js/main.js · inisialisasi");
  console.error("Inisialisasi situs TCS gagal:", error);
  const main = document.getElementById("site-main");
  if (main) {
    main.innerHTML = '<section class="section"><div class="container"><h2>Halaman belum dapat dimuat</h2><p class="section-intro">Panel diagnostik menampilkan jenis kesalahan, sumber, status HTTP jika tersedia, dan langkah pemeriksaan. Muat ulang halaman setelah pemeriksaan.</p></div></section>';
  }
}
