export function renderMissions(missions) {
  const list = document.getElementById("mission-list");
  if (!list || !Array.isArray(missions)) return;
  list.replaceChildren();
  missions.forEach((mission, index) => {
    const article = document.createElement("article");
    article.className = "overview-card";
    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${mission.title}`;
    const description = document.createElement("p");
    description.className = "card-copy";
    description.textContent = mission.text;
    article.append(title, description);
    list.append(article);
  });
}