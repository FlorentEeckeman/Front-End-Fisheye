class LikeMagnager {
  constructor(Photos) {
    this.Photos = Photos;

    this.$wrapper = document.createElement("div");
    this.$filterFormWrapper = document.querySelector(".filter-form-wrapper");
    this.$moviesWrapper = document.querySelector(".photograph-media");
  }

  async filterMovies(sort) {
    this.clearMoviesWrapper();

    /* Vous pourrez par la suite supprimer ces lignes */
    // const FilterLib = new FilterV1(this.Movies, actor)
    // const FilteredMovies = await FilterLib.filterByActor()

    const AdaptedFilterLib = new Filter(this.Photos, sort);
    const FilteredMovies = AdaptedFilterLib.filterBySort();

    FilteredMovies.forEach((Photo) => {
      const Template = new PhotoCard(Photo);
      this.$moviesWrapper.appendChild(Template.createPhotoCard());
    });
  }

  onChangeFilter() {
    this.$wrapper.querySelector("form").addEventListener("change", (e) => {
      const actor = e.target.value;
      this.filterMovies(actor);
    });
  }

  clearMoviesWrapper() {
    this.$moviesWrapper.innerHTML = "";
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

    this.$wrapper.innerHTML = filterForm;
    this.onChangeFilter();

    this.$filterFormWrapper.appendChild(this.$wrapper);
  }
}
