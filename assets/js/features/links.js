export function applySiteLinks(site) {
  document.querySelectorAll("[data-link-key]").forEach(box => {
    const url = site[box.dataset.linkKey];
    const link = box.matches("a") ? box : box.querySelector("a");
    if (!url || !link) {
      box.remove();
      return;
    }
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  });
}
