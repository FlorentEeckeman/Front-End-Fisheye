class LightBox {
  constructor(photoId) {
    this.index = JSON.parse(localStorage.index);
    this.Photos = JSON.parse(localStorage.Photos);
    this.photoId = this.Photos[this.index].id;

    this.$PhotomWrapper = document.querySelector(".lightBox_modal-container");
  }

  async displayPhoto(id) {
    let $wrapper = document.createElement("div");
    $wrapper.setAttribute("class", "lightBox_modal-display");
    this.clearLightBoxWrapper();

    this.Photos.forEach((Photo) => {
      let elemId = JSON.parse(localStorage.index);
      if (id) {
        elemId = this.Photos[id].id;
      } else {
        elemId = this.photoId;
      }

      if (this.Photos[JSON.parse(localStorage.index)].id === Photo.id) {
        let element;
        if (Photo.video) {
          console.log(Photo.video);
          element = `<video class="light-photo" alt="${Photo.title}" autoplay=true controls>
        <source src="assets/photos/${Photo.video}" autoplay=true mute=true type="video/mp4"></source></video>`;
        } else
          element = `<div class="light-photo" style="background-image: url('assets/photos/${Photo.image}')"aria-label="${Photo.title}"></div>`;

        $wrapper.innerHTML = `<div class="svg-left-arrow">
              <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path id="svg-left-arrow-fill" d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z" />
              </svg>
            </div>
            <div class="lightBox_modalPhoto">
              <div class="container-Photos">
               ${element}
              </div>
            </div>
            <div class="svg-right-arrow">
              <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="svg-right-arrow-fill" d="M0.360108 5.64L18.6801 24L0.360107 42.36L6.00011 48L30.0001 24L6.00011 3.88195e-06L0.360108 5.64Z" />
              </svg>          
            </div>`;
      }
    });

    this.$PhotomWrapper.appendChild($wrapper);

    this.$PhotomWrapper
      .querySelector(".svg-left-arrow")
      .removeEventListener("click", this.LeftPhotos);

    this.$PhotomWrapper
      .querySelector(".svg-right-arrow")
      .removeEventListener("click", this.RightPhotos);

    let elemId = JSON.parse(localStorage.index);
    this.maxIndex = Object.keys(this.Photos).length - 1;

    if (elemId >= this.maxIndex) {
      document.getElementById("svg-right-arrow-fill").style.fill = "none";
      document.getElementById("svg-left-arrow-fill").style.fill = "#911C1C";
      this.LeftPhotos();
    } else if (elemId <= 0) {
      document.getElementById("svg-left-arrow-fill").style.fill = "none";
      document.getElementById("svg-right-arrow-fill").style.fill = "#911C1C";
      this.RightPhotos();
    } else {
      document.getElementById("svg-left-arrow-fill").style.fill = "#911C1C";
      document.getElementById("svg-right-arrow-fill").style.fill = "#911C1C";
      this.RightPhotos();
      this.LeftPhotos();
    }

    localStorage.setItem(
      "modalIndex",
      JSON.stringify(this.Photos.map((e) => e.id).indexOf(this.photoId))
    );
  }

  setPos(index) {
    let current = JSON.parse(localStorage.index);
    this.maxIndex = Object.keys(this.Photos).length - 1;
    console.log(this.maxIndex);
    const left = document.getElementById("svg-left-arrow-fill");
    const right = document.getElementById("svg-right-arrow-fill");

    let res = 0;

    if (current <= 0) res = 0;
    else if (current > this.maxIndex) res = this.maxIndex;
    else {
      console.log("bang");
      res = current;
    }
    localStorage.setItem("index", res);
    //this.displayPhoto(JSON.parse(localStorage.modalIndex));
    console.log(
      "résultat : " + res,
      "max : " + this.maxIndex,
      "this.current : " + current,
      "LS : " + JSON.parse(localStorage.index)
    );
    this.displayPhoto(JSON.parse(localStorage.index));
  }
  LeftPhotos() {
    this.$PhotomWrapper
      .querySelector(".svg-left-arrow")
      .addEventListener("click", (e) => {
        e.preventDefault();
        let index = JSON.parse(localStorage.index);
        localStorage.setItem("index", JSON.stringify(index - 1));
        this.setPos();
      });
  }
  RightPhotos() {
    this.$PhotomWrapper
      .querySelector(".svg-right-arrow")
      .addEventListener("click", (e) => {
        e.preventDefault();
        let index = JSON.parse(localStorage.index);
        localStorage.setItem("index", JSON.stringify(index + 1));
        this.setPos();
      });
  }

  clearLightBoxWrapper() {
    console.log("clean");
    if (this.$PhotomWrapper.querySelector(".lightBox_modal-display")) {
      this.$PhotomWrapper.querySelector(".lightBox_modal-display").remove();
    }
  }

  render() {
    this.displayPhoto();
  }
}
