class LightBox {
  constructor(photoId) {
    this.index = JSON.parse(localStorage.index);
    this.Photos = JSON.parse(localStorage.Photos);
    this.photoId = this.Photos[this.index].id;
    this.$wrapper = document.createElement("div");
    this.$PhotomWrapper = document.querySelector(".lightBox_modalPhoto");
    this.$Container = document.querySelector(".lightBox_modal-display");
  }

  async displayPhoto(id) {
    console.log(id);
    this.clearLightBoxWrapper();

    const container = document.createElement("div");
    container.setAttribute("class", "container-Photos");
    this.Photos.forEach((Photo) => {
      if (id) {
        if (id === Photo.id) {
          console.log("trigger");
          container.innerHTML = `<div class="light-photo" style="background-image: url('assets/photos/${Photo.image}')"
        aria-label="${Photo.title}"></div>`;
        }
      } else {
        if (this.photoId === Photo.id) {
          container.innerHTML = `<div class="light-photo" style="background-image: url('assets/photos/${Photo.image}')"
        aria-label="${Photo.title}"></div>`;
        }
      }
    });

    this.$PhotomWrapper.appendChild(container);

    localStorage.setItem(
      "modalIndex",
      JSON.stringify(this.Photos.map((e) => e.id).indexOf(this.photoId))
    );
  }

  async setPos(index) {
    this.current = JSON.parse(localStorage.modalIndex);
    this.maxIndex = Object.keys(this.Photos).length;

    const left = document.getElementById("svg-left-arrow-fill");
    const right = document.getElementById("svg-right-arrow-fill");

    let res;

    if (this.current === 1 && index === -1) left.style.fill = "none";
    if (this.current === this.maxIndex - 1 && index === 1)
      right.style.fill = "none";
    if (this.current === this.maxIndex) right.style.fill = "none";
    if (this.current === 0) left.style.fill = "none";

    if (this.current === 0 && index === -1) res = this.current;
    else if (this.current === this.maxIndex && index === 1) res = this.current;
    else {
      left.style.fill = "#911C1C";
      right.style.fill = "#911C1C";
      if (index === -1) {
        res = this.current - 1;
      } else {
        {
          res = this.current + 1;
        }
      }
    }
    localStorage.setItem("modalIndex", res);
    this.displayPhoto(JSON.parse(localStorage.modalIndex));
    console.log(
      "this.maxIndex : " + this.maxIndex,
      "index : " + index,
      "this.current : " + this.current,
      "LS : " + JSON.parse(localStorage.modalIndex)
    );
  }
  LeftPhotos() {
    this.$Container
      .querySelector(".svg-left-arrow")
      .addEventListener("click", () => {
        this.setPos(-1, Object.keys(this.Photos).length);
      });
  }
  RightPhotos() {
    this.$Container
      .querySelector(".svg-right-arrow")
      .addEventListener("click", () => {
        this.setPos(1, Object.keys(this.Photos).length);
      });
  }

  clearLightBoxWrapper() {
    console.log("clean");
    const elem = document.querySelector(".lightBox_modalPhoto");
    console.log(elem);
    elem.innerHTML = null;
    //.innerHTML = null;
    console.log(this.$PhotomWrapper);
  }

  render() {
    this.displayPhoto();

    //this.onChangeFilter();
    this.RightPhotos();
    this.LeftPhotos();

    //this.$filterFormWrapper.appendChild(this.$wrapper);
  }
}
