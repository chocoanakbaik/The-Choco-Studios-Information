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
    identity.className = "product-identity";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const category = document.createElement("span");
    category.className = "product-label";
    category.textContent = product.category;
    identity.append(title, category);
    top.append(symbol, identity);

    const description = document.createElement("p");
    description.className = "card-copy product-description";
    description.textContent = product.description;

    const footer = document.createElement("div");
    footer.className = "product-card-footer";

    const status = document.createElement("span");
    status.className = "status-tag";
    status.textContent = product.status;
    if (product.status === "Tersedia") status.classList.add("status-available");
    else if (product.status.toLowerCase().includes("pengembangan")) status.classList.add("status-development");
    else status.classList.add("status-pending");

    const actions = document.createElement("div");
    actions.className = "product-actions";

    if (product.productUrl) {
      const openProduct = document.createElement("a");
      openProduct.className = "button button-primary button-small";
      openProduct.href = product.productUrl;
      openProduct.target = "_blank";
      openProduct.rel = "noopener noreferrer";
      openProduct.textContent = product.actionLabel || "Buka produk";
      openProduct.setAttribute("aria-label", `${openProduct.textContent}: ${product.name}`);
      actions.append(openProduct);
    }

    const detailsLink = document.createElement("a");
    detailsLink.className = "button button-secondary button-small";
    detailsLink.href = product.detailsUrl;
    detailsLink.setAttribute("aria-label", `Lihat detail ${product.name}`);
    detailsLink.textContent = "Lihat detail";
    actions.append(detailsLink);

    footer.append(status, actions);
    article.append(top, description, footer);
    list.append(article);
  }
}
