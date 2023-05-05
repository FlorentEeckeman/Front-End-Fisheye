//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  let photographers = await fetch("../../data/photographers.json")
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers: [...photographers.photographers, ...photographers.media],
    media: [...photographers.media],
  };
}
async function displayData(photographers, media) {
  var urlSearchParams = new URL(document.location).searchParams;
  const photographersSection = document.querySelector(".photograph-header");
  const contactButton = document.querySelector(".contact_button");
  photographers.forEach((photographer) => {
    if (photographer.id == urlSearchParams.get("id")) {
      const photographerModel = photographerFactory(photographer, media);
      const userCardDOM = photographerModel.getUserCardDOM();

      contactButton.parentNode.insertBefore(
        userCardDOM.firstChild.firstChild,
        contactButton
      );

      photographersSection.appendChild(userCardDOM);
    }
  });
}
function getPrice(photographers, id) {
  let res;
  photographers.forEach((photographer) => {
    if (photographer.id == id) {
      res = photographer.price;
    }
  });
  return res;
}

function displayPhotos(photographers, media) {
  var urlSearchParams = new URL(document.location).searchParams;
  const id = urlSearchParams.get("id");
  const photosSection = document.querySelector(".photograph-media");
  const main = document.querySelector("#main");
  let count = 0;
  const price = getPrice(photographers, id);
  media.forEach((photo) => {
    const Template = new PhotoCard(photo, "none");
    photosSection.appendChild(Template.createPhotoCard());
    count += photo.likes;
  });
  const infoCard = getInfoCardDOM(count, price);
  main.appendChild(infoCard);
}

function getUserPhoto(media) {
  var urlSearchParams = new URL(document.location).searchParams;
  const id = urlSearchParams.get("id");
  let res = [];
  media.forEach((photo) => {
    if (photo.photographerId == id) {
      res.push(photo);
    }
  });
  return res;
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();

  displayData(photographers);
  const userPhoto = getUserPhoto(media);
  localStorage.setItem("Photos", JSON.stringify(userPhoto));
  displayPhotos(photographers, userPhoto);
  const Filter = new FilterForm(userPhoto);
  Filter.render();
  localStorage.setItem("instance", JSON.stringify(false));
}

init();
