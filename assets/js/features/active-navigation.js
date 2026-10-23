export function initActiveNavigation() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = new Map();

  for (const link of links) {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) sections.set(id, section);
  }

  const homeSection = document.getElementById("home");
  if (homeSection) sections.set("home", homeSection);

  if (!sections.size) return;

  const setActive = id => {
    for (const link of links) {
      if (link.getAttribute("href") === `#${id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  };

  nav.addEventListener("click", event => {
    const link = event.target.closest('a[href^="#"]');
    if (link) setActive(link.getAttribute("href").slice(1));
  });

  window.addEventListener("hashchange", () => {
    const id = window.location.hash.slice(1);
    if (sections.has(id)) setActive(id);
  });

  const initialId = window.location.hash.slice(1);
  if (sections.has(initialId)) setActive(initialId);

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];

    if (visible) setActive(visible.target.id);
  }, {
    rootMargin: "-18% 0px -70% 0px",
    threshold: 0
  });

  for (const section of sections.values()) observer.observe(section);
}
