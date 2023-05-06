function photographerFactory(data, link) {
  const { name, portrait, country, city, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  let url = location.origin;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const divTop = `<div aria-labe="lien vers la page de ${name}">
      <img src="${picture}" alt="photo de ${name}"></img>
      <h2 class="name">${name}</h2>
    </div>`;

    article.innerHTML = divTop;
    if (link) {
      article.addEventListener("click", () => {
        window.location.replace(url + "/photographer.html?id=" + id);
      });
    }
    const userHeaderInfoCard = `
    <p class="location">${city}, ${country}</p>
    <p class="tagline">${tagline}</p>
    <p class="price">${price}€/jour</p>
    `;
    article.innerHTML += userHeaderInfoCard;
    return article;
  }
  return { name, picture, getUserCardDOM };
}
