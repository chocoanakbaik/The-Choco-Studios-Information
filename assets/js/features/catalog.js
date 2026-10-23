export function renderCatalog(products) {
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
    const detailsLink = document.createElement("a");
    detailsLink.className = "text-link product-details-link";
    detailsLink.href = product.detailsUrl;
    detailsLink.setAttribute("aria-label", `Lihat detail ${product.name}`);
    detailsLink.textContent = "Lihat detail";
    article.append(top, description, status, detailsLink);
    list.append(article);
  }
}