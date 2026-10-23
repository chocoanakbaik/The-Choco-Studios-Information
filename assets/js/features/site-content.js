function getValue(source, path) {
  return path.split(".").reduce((value, key) => {
    if (value === null || value === undefined) return undefined;
    return value[key];
  }, source);
}

export function applySiteContent(site) {
  document.querySelectorAll("[data-site-text]").forEach(element => {
    const value = getValue(site, element.dataset.siteText);
    if (typeof value === "string" || typeof value === "number") {
      element.textContent = String(value);
    }
  });

  document.querySelectorAll("[data-site-list]").forEach(element => {
    const value = getValue(site, element.dataset.siteList);
    if (!Array.isArray(value) || !value.every(item => typeof item === "string")) {
      element.textContent = "";
      return;
    }
    element.textContent = value.join(element.dataset.separator ?? ", ");
  });
}
