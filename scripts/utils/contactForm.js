function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
function sendData() {
  var firstValue = document.getElementById("first").value;
  var lastValue = document.getElementById("last").value;
  var emailValue = document.getElementById("email").value;
  var commentValue = document.getElementById("comment").value;

  console.log("prénom : " + firstValue);
  console.log("nom : " + lastValue);
  console.log("émail : " + emailValue);
  console.log("commentaire : " + commentValue);
  closeModal();
}
const element = document.querySelector("form");
element.addEventListener("submit", function (event) {
  event.preventDefault();
  // actual logic, e.g. validate the form
  sendData();
});
