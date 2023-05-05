const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  let url = location.origin;
  window.location.replace(url);
});
