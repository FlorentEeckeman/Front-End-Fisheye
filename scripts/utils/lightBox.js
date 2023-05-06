function closeLightBoxModal() {
  const modal = document.getElementById("lightBox_modal");
  modal.style.display = "none";
  const main = document.getElementById("main");
  main.style.display = "block";
  localStorage.setItem("instance", JSON.stringify(false));
}

function getPos(obj, id) {
  return obj.map((e) => e.id).indexOf(id);
}
