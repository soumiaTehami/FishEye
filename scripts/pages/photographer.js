import { displayPhotos, displayMedia } from "../templates/infophotographe.js";
import { displayTarif } from "../templates/Tarif.js";

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

async function getPhotographerData(id) {
  try {
    const response = await fetch("data/photographers.json");
    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }
    const data = await response.json();
    const photographer = data.photographers.find(
      (photographer) => photographer.id == id
    );
    const media = data.media.filter((media) => media.photographerId == id);

    if (photographer && media) {
      const tarif = photographer.price;
      return { photographer, media, tarif };
    } else {
      throw new Error("Photographe non trouvé ou médias non disponibles");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données du photographe :",
      error
    );
    throw error; // Propagez l'erreur pour que le code appelant puisse la gérer
  }
}

async function addHeaderToModal() {
  try {
    const photographerData = await getPhotographerData(id);
    if (!photographerData.photographer) {
      throw new Error("Photographe non trouvé");
    }
    const photographerName = photographerData.photographer.name;
    const modalHeader = document.querySelector(".modal_form_name");
    modalHeader.innerHTML = `<h1>${photographerName}</h1>`;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'en-tête au modal :", error);
  }
}

addHeaderToModal();

// Assurez-vous que l'URL du fichier JavaScript est correcte
const scriptUrl = "scripts/pages/photographer.js";

// Chargez le script JavaScript
fetch(scriptUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur de chargement du script : " + response.status);
    }
    return response.text();
  })
  .then(scriptText => {
    // Exécutez le script une fois qu'il est chargé
    eval(scriptText);
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors du chargement du script :", error);
  });

getPhotographerData(id)
  .then((photographerData) => {
    if (photographerData) {
      displayPhotos(photographerData.photographer);
      if (photographerData.media) {
        const mediaContainer = document.getElementById("photographer_gallery");
        displayMedia(mediaContainer, photographerData);
      }
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
