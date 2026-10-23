import { initMenu } from "./menu.js";
import { products } from "../../data/products.js";
import { site } from "../../data/site.js";

initMenu();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const productList = document.getElementById("product-list");
if (productList) {
  productList.replaceChildren();
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
    productList.append(article);
  }
}

const missionList = document.getElementById("mission-list");
if (missionList && Array.isArray(site.missions)) {
  missionList.replaceChildren();
  site.missions.forEach((mission, index) => {
    const article = document.createElement("article");
    article.className = "overview-card";
    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${mission.title}`;
    const description = document.createElement("p");
    description.className = "card-copy";
    description.textContent = mission.text;
    article.append(title, description);
    missionList.append(article);
  });
}