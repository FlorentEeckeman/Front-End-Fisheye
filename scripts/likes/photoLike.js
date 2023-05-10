class PhotoLikeCounter {
  constructor(initialCount) {
    //this._count = parseInt(initialCount, 10);
    this._count = 0;
    this._$LikeCount = document.querySelector(".total-likes");
  }

  update(action) {
    if (action === "INC") {
      this._count = 1;
    } else if (action === "DEC") {
      this._count = -1;
    } else {
      throw "Unknow action";
    }

    console.log(this._$LikeCount.innerText);
    console.log("count : " + this._count);
    this._$LikeCount.innerHTML =
      parseInt(this._$LikeCount.innerText, 10) + this._count;
  }
}
