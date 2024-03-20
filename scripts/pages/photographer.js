//Mettre le code JavaScript lié à la page photographer.html
const searchParams = new URLSearchParams(window.location.search);

// Accéder à un paramètre spécifique
const id = searchParams.get("id");


// Utiliser les valeurs des paramètres
console.log("ID:", id);
// Récupérer tous les éléments avec la classe "photographer"
const photographers = document.querySelectorAll(".photographer-card");

// Ajouter un gestionnaire d'événements à chaque photographe
photographers.forEach((photographer) => {
  photographer.addEventListener("click", () => {
    // Récupérer l'ID du photographe à partir de l'attribut data-id
    const photographerId = photographer.getAttribute("id");
    // Rediriger vers la page de détails avec l'ID du photographe comme paramètre d'URL
    window.location.href = `photographer.html?id=${photographerId}`;
    console.log(photographerId)
  });
});



