import { initMenu } from "./menu.js";

initMenu();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());