export function applySiteLinks(site) {
  document.querySelectorAll("[data-link-key]").forEach(box => {
    const key = box.dataset.linkKey;
    const url = key === "email" && site.email ? `mailto:${site.email}` : site[key];
    const link = box.matches("a") ? box : box.querySelector("a");
    if (typeof url !== "string" || !url.trim() || !link) {
      box.remove();
      return;
    }

    link.href = url;
    const textKey = link.dataset.linkText;
    if (textKey && typeof site[textKey] === "string") {
      link.textContent = site[textKey];
    }

    if (/^https?:\/\//i.test(url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  });
}
