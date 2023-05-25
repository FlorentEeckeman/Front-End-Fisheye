class LikeManager {
  constructor(photos) {
    this.photos = photos;

    this.wrapper = document.createElement("div");
    this.filterFormWrapper = document.querySelector(".filter-form-wrapper");
    this.photoCardsWrapper = document.querySelector(".photograph-media");
  }

  async filterMovies(sort) {
    this.clearPhotoCardsWrapper();

    const AdaptedFilterLib = new Filter(this.photos, sort);
    const FilteredMovies = AdaptedFilterLib.filterBySort();

    FilteredMovies.forEach((photo) => {
      const Template = new photoCard(photo);
      this.photoCardsWrapper.appendChild(Template.createPhotoCard());
    });
  }

  onChangeFilter() {
    this.wrapper.querySelector("form").addEventListener("change", (e) => {
      const sort = e.target.value;
      this.filterMovies(sort);
    });
  }

  clearPhotoCardsWrapper() {
    this.photoCardsWrapper.innerHTML = "";
  }

  render() {
    const filterForm = `
              <form class="filter-form" action="#" method="POST">
                  <label for="filter-select">Choississez votre acteur préféré : </label>
                  <select name="filter-select" id="filter-select">
                      <option value="like">Popularité</option>
                      <option value="date">Date</option>
                      <option value="title">Titre</option>
                  </select>
              </form>
          `;

    this.wrapper.innerHTML = filterForm;
    this.onChangeFilter();

    this.filterFormWrapper.appendChild(this.wrapper);
  }
}
