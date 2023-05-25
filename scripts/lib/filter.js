class Filter {
  /**
   *
   * @param {array} Movies
   * @param {string} actor
   */
  constructor(Photos, test) {
    this.photos = Photos;
    this.test = test;
  }

  filterBySort() {
    let filteredPhotos = this.photos;

    if (this.test === "0") {
      filteredPhotos.sort((a, b) =>
        a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
      );
    } else if (this.test === "1") {
      filteredPhotos.sort((a, b) =>
        a.date > b.date ? -1 : b.date > a.date ? 1 : 0
      );
    } else if (this.test === "2") {
      filteredPhotos.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    } else {
      return this.photos;
    }

    return filteredPhotos;
  }
}
