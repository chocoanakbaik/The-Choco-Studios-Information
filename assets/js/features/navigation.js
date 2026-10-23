export function renderNavigation(items) {
  const nav = document.getElementById("site-nav");
  if (!nav || !Array.isArray(items)) return;

  const links = document.createDocumentFragment();
  for (const item of items) {
    if (
      !item ||
      typeof item.label !== "string" ||
      typeof item.href !== "string"
    ) continue;

    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    if (item.group === "secondary") link.classList.add("nav-secondary");
    links.append(link);
  }

  nav.replaceChildren(links);
}