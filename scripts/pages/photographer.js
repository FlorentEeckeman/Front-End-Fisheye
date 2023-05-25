class App {
  constructor() {
    this.totalLikesCounter = new totalLikesCounter();
    this.PhotoLikeCounter = new PhotoLikeCounter();

    this.totalLikesCounter.subscribe(this.PhotoLikeCounter);
  }
  displayData(photographers, media) {
    var urlSearchParams = new URL(document.location).searchParams;
    const photographersSection = document.querySelector(".photograph-header");
    const contactButton = document.querySelector(".contact_button");
    photographers.forEach((photographer) => {
      if (photographer.id == urlSearchParams.get("id")) {
        const photographerModel = photographerFactory(photographer, media);
        const userCardDOM = photographerModel.getUserCardDOM();

        contactButton.parentNode.insertBefore(
          userCardDOM.firstChild,
          contactButton
        );

        photographersSection.appendChild(userCardDOM);
      }
    });
  }
  getPhotographerPrice(photographers, id) {
    let res;
    photographers.forEach((photographer) => {
      if (photographer.id == id) {
        res = photographer.price;
      }
    });
    return res;
  }

  displayPhotos(photographers, media) {
    var urlSearchParams = new URL(document.location).searchParams;
    const id = urlSearchParams.get("id");
    const photosSection = document.querySelector(".photograph-media");
    let count = 0;

    const price = this.getPhotographerPrice(photographers, id);
    media.forEach((photo) => {
      const Template = new PhotoCard(photo, this.totalLikesCounter, media);
      photosSection.appendChild(Template.createPhotoCard());
      count += photo.likes;
    });

    document.querySelector(".total-likes").innerHTML = `<h2>${count}</h2>`;
    document.querySelector(".daily-fee").innerText = price + "€ / jour";
  }

  getUserPhoto(media) {
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

  async init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    const userPhoto = this.getUserPhoto(media);
    const Filter = new FilterForm(userPhoto, this.totalLikesCounter);
    Filter.render();
    console.log("media ", await getPhotographers());
    this.displayData(photographers);

    this.displayPhotos(photographers, userPhoto);
  }
}
const app = new App();
app.init();
