class PhotoLikeCounter {
  constructor() {
    this.count = 0;
    this.likeCount = document.querySelector(".total-likes");
  }

  update(action) {
    if (action === "INC") {
      this.count = 1;
    } else if (action === "DEC") {
      this.count = -1;
    } else {
      throw "Unknow action";
    }

    this.likeCount.innerHTML =
      parseInt(this.likeCount.innerText, 10) + this.count;
  }
}
