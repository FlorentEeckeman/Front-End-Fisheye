class PhotoCard {
  constructor(photo, totalLikesCounter, photos) {
    this.photo = photo;
    this.photos = photos;
    this.totalLikesCounter = totalLikesCounter;
    this.wrapper = document.createElement("article");
    this.wrapper.classList.add("photo-card-wrapper");
  }

  handleWishButton() {
    const that = this;
    this.counter = this.wrapper.querySelector(".like");
    this.wrapper.querySelector(".like").addEventListener("click", function () {
      if (this.classList.contains("wished")) {
        this.classList.remove("wished");
        that.wrapper.querySelector(".like-counter").innerText =
          that.photo.likes;
        that.totalLikesCounter.fire("DEC");
      } else {
        this.classList.add("wished");
        that.wrapper.querySelector(".like-counter").innerText =
          that.photo.likes + 1;
        that.totalLikesCounter.fire("INC");
      }
    });
  }
  displayLightboxModal() {
    this.$modal = document.getElementById("lightBox_modal");
    this.$modal.style.display = "block";
    this.disablePhotoTabIndex();
    console.log(this.photos);
    const index = this.photos.findIndex((x) => x.id === this.photo.id);
    console.log(index);
    const modal = new LightBox(index, this.photo, this.photos);
    modal.render();
  }
  onClickImg() {
    const that = this;
    this.wrapper.querySelector(".photo").removeEventListener("click", this);
    this.wrapper.querySelector(".photo").removeEventListener("keypress", this);
    this.wrapper.querySelector(".photo").removeEventListener("keypress", this);
    this.wrapper
      .querySelector(".photo")
      .addEventListener("click", function (e) {
        that.displayLightboxModal();
      });
    this.wrapper
      .querySelector(".photo")
      .addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
          that.displayLightboxModal();
        }
      });
  }
  disablePhotoTabIndex() {
    const photos = document.querySelectorAll(".photo");
    photos.forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });
    const videos = document.querySelectorAll(".video");
    videos.forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });
  }

  createPhotoCard() {
    let res;
    let mediaDiv;
    if (this.photo.video) {
      mediaDiv = `<video class="photo" alt="${this.photo.title}" tabindex="0">
        <source src="assets/photos/${this.photo.video}" autoplay=true type="video/mp4"></source></video>`;
    } else {
      mediaDiv = `<div class="photo" role="img" style="background-image: url('assets/photos/${this.photo.image}')"
        aria-label="${this.photo.title}" tabindex="0"></div>`;
    }
    const photoCard = String.raw`${mediaDiv}                
                  <div class="movie-thumbnail center">
                <h2 class="name">${this.photo.title}</h2>
                <div class="fs-14 center like-btn" "aria-labe", "il y a " + ${this.photo.likes} + " j'aime">
                    <h2 class="like-counter" >${this.photo.likes}</h2>
                    <svg class="like" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
                    </svg>
                </div>
            </div>
        `;

    this.wrapper.innerHTML = photoCard;

    this.onClickImg();
    this.handleWishButton();
    res = this.wrapper;

    return res;
  }
}
