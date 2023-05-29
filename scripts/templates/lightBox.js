class LightBox {
  constructor(photoId, photo, photos) {
    this.index = photoId;
    this.photos = photos;
    this.photoId = photo.id;
    this.photomWrapper = document.getElementById("lightBox_modal");
    this.maxIndex = Object.keys(this.photos).length - 1;
  }

  displayPhoto(id) {
    let wrapper = document.createElement("div");
    wrapper.setAttribute("class", "lightBox_modal-container");
    this.clearLightBoxWrapper();
    let currentId = this.photoId;
    this.photos.forEach((Photo, index) => {
      if (id !== undefined) {
        currentId = this.photos[id].id;
      }
      if (currentId === Photo.id) {
        let element;
        if (Photo.video) {
          element = `<video class="light-photo" alt="${Photo.title}" autoplay=true controls>
        <source src="assets/photos/${Photo.video}" autoplay=true mute=true type="video/mp4"></source></video>`;
        } else
          element = `<div class="light-photo" style="background-image: url('assets/photos/${Photo.image}')"aria-label="${Photo.title}"></div>`;

        wrapper.innerHTML = `<svg class="lightBox_modal-close" aria-label="Arrow" role="navigation" focusable="true" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" tabindex="0">
        <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#901C1C"/>
      </svg>
        <div class="lightBox_modal-display"><div class="svg-arrow svg-left-arrow" tabindex="0">
              <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path id="svg-left-arrow-fill" d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" />
              </svg>
            </div>
            <div class="lightBox_modalPhoto">
              <div class="container-Photos" id="container-Photos" data-id=${index}>
               ${element}
              </div>
            </div>
            <div class="svg-arrow svg-right-arrow" aria-label="Arrow" role="navigation" focusable="true" tabindex="0">
              <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="svg-right-arrow-fill" d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 3.88195e-06L0.360108 5.64Z" />
              </svg>          
            </div>
            </div>`;
      }
    });

    this.photomWrapper.appendChild(wrapper);

    let styleIndex = this.index;
    if (id !== undefined) styleIndex = id;
    this.displayArrows(styleIndex);

    this.modalDisplay();
  }

  // determine carousel current position
  setPos(index) {
    let res = 0;
    if (index <= 0) res = 0;
    else if (index > this.maxIndex) res = this.maxIndex;
    else res = index;
    this.displayPhoto(res);
  }

  LeftArrowListener() {
    const that = this;
    ["click", "keypress"].forEach((ev) => {
      this.photomWrapper
        .querySelector(".svg-left-arrow")
        .addEventListener(ev, function (e) {
          e.preventDefault();
          if (ev == "click") {
            const index = document.getElementById("container-Photos");
            that.setPos(parseInt(index.dataset.id, 10) - 1);
          }
          if (e.keyCode == 13) {
            const index = document.getElementById("container-Photos");
            that.setPos(parseInt(index.dataset.id, 10) - 1);
          }
        });
    });
  }
  RightArrowListener() {
    const that = this;
    ["click", "keypress"].forEach((ev) => {
      this.photomWrapper
        .querySelector(".svg-right-arrow")
        .addEventListener(ev, function (e) {
          e.preventDefault();
          if (ev == "click") {
            const index = document.getElementById("container-Photos");
            that.setPos(parseInt(index.dataset.id, 10) + 1);
          }
          if (e.keyCode == 13) {
            const index = document.getElementById("container-Photos");
            that.setPos(parseInt(index.dataset.id, 10) + 1);
          }
        });
    });
  }
  navigation(e) {
    const that = this;
    if (e.key == "ArrowRight") {
      const index = document.getElementById("container-Photos");
      that.setPos(parseInt(index.dataset.id, 10) + 1);
    }
    if (e.key == "ArrowLeft") {
      const index = document.getElementById("container-Photos");
      that.setPos(parseInt(index.dataset.id, 10) - 1);
    }
    if (e.key == "Escape") {
      that.closeModal();
    }
  }
  keyboardNavigation() {
    console.log("keyboard");
    document.getElementById("lightBox_modal");
    this.callback = this.navigation.bind(this);
    document.addEventListener("keyup", this.callback, true);
  }
  // display arrows in relation to index position
  displayArrows(styleIndex) {
    if (styleIndex >= this.maxIndex) {
      document.getElementById("svg-right-arrow-fill").style.fill = "none";
      document.querySelector(".svg-right-arrow").style.cursor = "auto";
      document.getElementById("svg-left-arrow-fill").style.fill = "#911C1C";
      this.LeftArrowListener();
    } else if (styleIndex <= 0) {
      document.getElementById("svg-left-arrow-fill").style.fill = "none";
      document.querySelector(".svg-left-arrow").style.cursor = "auto";
      document.getElementById("svg-right-arrow-fill").style.fill = "#911C1C";
      this.RightArrowListener();
    } else {
      document.getElementById("svg-left-arrow-fill").style.fill = "#911C1C";
      document.getElementById("svg-right-arrow-fill").style.fill = "#911C1C";
      this.RightArrowListener();
      this.LeftArrowListener();
    }
  }
  modalDisplay() {
    const that = this;
    ["click", "keypress"].forEach((ev) => {
      this.photomWrapper
        .querySelector(".lightBox_modal-close")
        .addEventListener(ev, function (e) {
          e.preventDefault();
          if (ev == "click") {
            that.closeModal();
          }
          if (e.keyCode == 13) {
            that.closeModal();
          }
        });
    });
  }

  closeModal() {
    console.log("close");

    const modal = document.getElementById("lightBox_modal");
    modal.style.display = "none";
    const main = document.getElementById("main");
    main.style.display = "block";
    this.enablePhotoTabIndex();

    document.removeEventListener("keyup", this.callback, true);
  }
  enablePhotoTabIndex() {
    const photos = document.querySelectorAll(".photo");
    photos.forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
    const videos = document.querySelectorAll(".video");
    videos.forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
  }
  clearLightBoxWrapper() {
    if (this.photomWrapper.querySelector(".lightBox_modal-container")) {
      this.photomWrapper.querySelector(".lightBox_modal-container").remove();
    }
  }

  render() {
    this.displayPhoto();
    this.modalDisplay();
    this.keyboardNavigation();
  }
}
