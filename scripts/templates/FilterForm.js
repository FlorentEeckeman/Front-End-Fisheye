class FilterForm {
  constructor(Photos) {
    this.Photos = Photos;

    this.$wrapper = document.createElement("div");
    this.$wrapper.setAttribute("class", "filter-div");
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

    localStorage.setItem("Photos", JSON.stringify(FilteredMovies));
    FilteredMovies.forEach((Photo) => {
      const Template = new PhotoCard(Photo, sort);
      this.$moviesWrapper.appendChild(Template.createPhotoCard());
    });
  }

  onChangeFilter() {
    document.querySelector(".select-items").addEventListener("click", (e) => {
      console.log(e);
      const actor = document.querySelector(".same-as-selected");

      console.log(actor.value);
      this.filterMovies(actor.value);
    });
  }

  clearMoviesWrapper() {
    this.$moviesWrapper.innerHTML = "";
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

    this.$wrapper.innerHTML = filterForm;

    this.$filterFormWrapper.appendChild(this.$wrapper);
    filterDisplay();
    this.onChangeFilter();
  }
}
