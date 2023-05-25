function getInfoCardDOM(likes, price, add) {
  let heart = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
      </svg>`;
  const infoCard = document.createElement("div");
  infoCard.setAttribute("class", "info-card");
  const totalLikes = document.createElement("div");
  if (add) totalLikes.innerHTML = `<p class="total-likes">${likes + add}</p>`;
  else totalLikes.innerHTML = `<p class="total-likes">${likes}</p>`;
  totalLikes.innerHTML = `<p class="total-likes">${likes}</p>`;
  totalLikes.innerHTML += heart;
  const totalPrice = document.createElement("div");
  totalPrice.textContent = price + "€ / jour";
  infoCard.appendChild(totalLikes);
  infoCard.appendChild(totalPrice);
  return infoCard;
}

async function getPhotosByPhotographId(id) {
  const photographers = await getPhotographers();

  return photos;
}
