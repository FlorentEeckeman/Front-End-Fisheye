const logo = document.querySelector(".logo");

["click", "keypress"].forEach((ev) => {
  logo.addEventListener(ev, function (e) {
    if (ev == "click") {
      let url = location.origin;
      window.location.replace(url);
    }
    if (e.keyCode == 13) {
      let url = location.origin;
      window.location.replace(url);
    }
  });
});
