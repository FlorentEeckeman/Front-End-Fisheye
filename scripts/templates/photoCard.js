class PhotoCard {
  constructor(photos) {
    this._photos = photos;

    this.$wrapper = document.createElement("article");
    this.$wrapper.classList.add("photo-card-wrapper");
  }

  get photos() {
    return this._photos;
  }
  onClickImg() {
    this.$wrapper.querySelector(".photo").addEventListener("click", () => {
      console.log("clicked");
      this.displayLightboxModal();
    });
  }

  displayLightboxModal() {
    this.$modal = document.getElementById("lightBox_modal");
    this.$modal.style.display = "block";
  }

  createPhotoCard() {
    let res;
    let mediaDiv;

    if (this._photos.video) {
      mediaDiv = `<video class="photo" alt="${this._photos.title}">
        <source src="assets/photos/${this._photos.video}" autoplay=true type="video/mp4"></source></video>`;
    } else {
      mediaDiv = `<div class="photo" style="background-image: url('assets/photos/${this._photos.image}')"
        aria-label="${this._photos.title}"></div>`;
    }
    const photoCard = String.raw`${mediaDiv}                
                  <div class="movie-thumbnail center">
                <h2 class="name">${this._photos.title}</h2>
                <div class="fs-14 center" "aria-labe", "il y a " + ${this._photos.likes} + " j'aime">
                    <p class="like">${this._photos.likes}</p>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
                    </svg>
                </div>
            </div>
        `;

    this.$wrapper.innerHTML = photoCard;
    this.onClickImg();
    res = this.$wrapper;

    return res;
  }
}
