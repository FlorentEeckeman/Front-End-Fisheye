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
  getPrice(photographers, id) {
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
    const main = document.querySelector("#main");
    let count = 0;
    const price = this.getPrice(photographers, id);
    media.forEach((photo) => {
      const Template = new PhotoCard(photo, "none", this.totalLikesCounter);
      photosSection.appendChild(Template.createPhotoCard());
      count += photo.likes;
    });

    document.querySelector(".total-likes").innerText = count;
    document.querySelector(".daily-fee").innerText = price + "€ / jour";
    // const infoCard = getInfoCardDOM(count, price, media);
    //main.appendChild(infoCard);
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

    this.displayData(photographers);
    const userPhoto = this.getUserPhoto(media);
    localStorage.setItem("Photos", JSON.stringify(userPhoto));
    this.displayPhotos(photographers, userPhoto);
    const Filter = new FilterForm(userPhoto);
    Filter.render();
    localStorage.setItem("instance", JSON.stringify(false));
  }
}
const app = new App();
app.init();
