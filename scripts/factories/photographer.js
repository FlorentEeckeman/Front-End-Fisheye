function photographerFactory(data, link) {
  const { name, portrait, country, city, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const divTop = `<a href="photographer.html?id=${id}" aria-label="${name}">
      <img src="${picture}" alt="${name}"></img>
    
    </a>`;

    article.innerHTML = divTop;
    const userHeaderInfoCard = `
    <h2 class="name">${name}</h2>
    <p class="location">${city}, ${country}</p>
    <p class="tagline">${tagline}</p>
    <p class="price">${price}€/jour</p>
    `;
    article.innerHTML += userHeaderInfoCard;
    return article;
  }
  return { name, picture, getUserCardDOM };
}
