import { displayPhotos,displayMedia} from "../templates/infophotographe.js";
import {displayTarif} from "../templates/Tarif.js";
// Extraire l'ID du photographe de l'URL
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

// Fonction pour récupérer les données du photographe depuis le fichier JSON
async function getPhotographerData(id) {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(
      (photographer) => photographer.id == id
     
    );
    const media = data.media.filter((media) => media.photographerId == id);

    if (photographer && media) {
      // Ajout de la récupération du tarif
      const tarif = photographer.price;
      return { photographer, media, tarif };
    } else {
      throw new Error("Photographe non trouvé");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données du photographe :",
      error
    );
  }
}
async function addHeaderToModal() {
  try {
    const photographerData = await getPhotographerData(id);
    const photographerName = photographerData.photographer.name;

    const modalHeader = document.querySelector(".modal_form_name");
    modalHeader.innerHTML = `<h1>${photographerName}</h1>`;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'en-tête au modal :", error);
  }
}

// Appel de la fonction pour ajouter l'en-tête au modal
addHeaderToModal()

// Appel de la fonction pour récupérer les données du photographe
getPhotographerData(id)
  .then((photographerData) => {
    if (photographerData) {
      displayPhotos(photographerData.photographer);

      // Afficher les médias du photographe s'ils existent
      if (photographerData.media) {
        const mediaContainer = document.getElementById("photographer_gallery");
        displayMedia(mediaContainer, photographerData);
      }

      // Afficher le tarif du photographe
      if (photographerData.tarif) {
        displayTarif(photographerData.tarif);
      }
    }
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la récupération des données du photographe :",
      error
    );
  });

// Événement de changement pour le menu déroulant de tri
