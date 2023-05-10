class Filter {
  /**
   *
   * @param {array} Movies
   * @param {string} actor
   */
  constructor(Photos, test) {
    this._Photos = Photos;
    this._test = test;
  }

  filterBySort() {
    let FilteredMovies = this._Photos;

    if (this._test === "0") {
      FilteredMovies.sort((a, b) =>
        a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
      );
    } else if (this._test === "1") {
      FilteredMovies.sort((a, b) =>
        a.date > b.date ? -1 : b.date > a.date ? 1 : 0
      );
    } else if (this._test === "2") {
      FilteredMovies.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    } else {
      return this._Photos;
    }

    return FilteredMovies;
  }
}
