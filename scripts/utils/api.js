async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  let data = await fetch("../../data/photographers.json");
  let photographers = await data.json();
  // et bien retourner le tableau photographers seulement une fois récupéré
  console.log("result : ", photographers);

  return photographers;
}
