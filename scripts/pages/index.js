// Import du modèle de photographe
import { photographerTemplate } from "../templates/photographer.js";

// Fonction pour récupérer les données des photographes
async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur de chargement des données des photographes");
    }
    const data = await response.json();
    return data.photographers;
  } catch (error) {
    console.error(error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}

// Fonction pour afficher les données des photographes
async function displayData(photographers) {
  try {
    // Vérifie si photographers est défini
    if (photographers) {
      const photographersSection = document.querySelector(".photographer_section");
      
      photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// Fonction d'initialisation
(async () => {
  try {
    // Récupère les données des photographes
    const photographers = await getPhotographers();
    await displayData(photographers);
    console.log(photographers);
  } catch (error) {
    console.error(error);
  }
})();
