async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  let photographers = await fetch("../../data/photographers.json")
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers: [...photographers.photographers, ...photographers.media],
    media: [...photographers.media],
  };
}
