class FilterForm {
  constructor(Photos, totalLikesCounter) {
    this.photos = Photos;
    this.totalLikesCounter = totalLikesCounter;
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("class", "filter-div");
    this.filterFormWrapper = document.querySelector(".filter-form-wrapper");
    this.photosWrapper = document.querySelector(".photograph-media");
  }

  async filterMovies(sort) {
    this.clearMoviesWrapper();

    const AdaptedFilterLib = new Filter(this.photos, sort);
    const filteredPhotos = AdaptedFilterLib.filterBySort();

    filteredPhotos.forEach((Photo) => {
      const template = new PhotoCard(
        Photo,
        this.totalLikesCounter,
        this.photos
      );
      this.photosWrapper.appendChild(template.createPhotoCard());
    });
  }

  onChangeFilter() {
    const that = this;
    ["click", "keypress"].forEach((ev) => {
      document
        .querySelector(".select-items")
        .addEventListener(ev, function (e) {
          if (ev == "click") {
            e.preventDefault();
            const filter = document.querySelector(".same-as-selected");
            that.filterMovies(filter.value);
          } else if (e.keyCode == 13) {
            e.preventDefault();
            const filter = document.querySelector(".same-as-selected");
            that.filterMovies(filter.value);
          }
        });
    });
  }

  clearMoviesWrapper() {
    this.photosWrapper.innerHTML = "";
  }

  render() {
    const filterForm = `<label for="standard-select"> Trier par</label>
    <div class="custom-select" style="width:200px">
            <select id="standard-select">
              <option >Défaut</option>
              <option value="0">Popularité</option>
              <option value="1">Date</option>
              <option value="2">Titre</option>
            </select>
          </div>
          <div class="filter-border-div"></div>`;

    this.wrapper.innerHTML = filterForm;

    this.filterFormWrapper.appendChild(this.wrapper);
    filterDisplay();
    this.onChangeFilter();
  }
}
