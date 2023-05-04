function photographerFactory(data) {
  const { name, portrait, country, city, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  let url = location.origin;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const divTop = document.createElement("div");
    divTop.setAttribute("aria-labe", "lien vers la page de " + name);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "photo de " + name);
    const h2 = document.createElement("h2");
    h2.setAttribute("class", "name");
    h2.textContent = name;
    const location = document.createElement("p");
    location.setAttribute("class", "location");
    location.textContent = city + ", " + country;
    const taglineText = document.createElement("p");
    taglineText.setAttribute("class", "tagline");
    taglineText.textContent = tagline;
    const prix = document.createElement("p");
    prix.setAttribute("class", "price");
    prix.textContent = price + "€/jour";

    article.appendChild(divTop);
    divTop.appendChild(img);
    divTop.appendChild(h2);
    article.appendChild(location);
    article.appendChild(taglineText);
    article.appendChild(prix);

    divTop.addEventListener("click", () => {
      window.location.replace(url + "/photographer.html?id=" + id);
    });

    return article;
  }
  return { name, picture, getUserCardDOM };
}
