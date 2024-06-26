
import { createLightbox } from "../templates/LightBox.js";
import { createMediaElement } from "../templates/media.js";

// Fonction pour afficher les informations du photographe sur la page HTML
export function displayPhotos(photographer) {
  const infoPhotographe = document.querySelector(".photograph-header");

  // Créer le conteneur pour les détails du photographe
  const photographerDetailsContainer = document.createElement("div");
  photographerDetailsContainer.classList.add("photographer-details");
  infoPhotographe.appendChild(photographerDetailsContainer);

  // Afficher l'image du photographe
  const photographerImg = document.createElement("img");
  photographerImg.src = `assets/photographers/${photographer.portrait}`;
  photographerImg.alt = photographer.name;
  photographerDetailsContainer.appendChild(photographerImg);

  // Créer un titre pour le nom du photographe
  const nameHeading = document.createElement("h1");
  nameHeading.textContent = photographer.name;
  photographerDetailsContainer.appendChild(nameHeading);

  // Créer un paragraphe pour afficher la ville et le pays du photographe
  const locationParagraph = document.createElement("p");
  locationParagraph.textContent = `${photographer.city}, ${photographer.country}`;
  locationParagraph.classList.add("details-paragraph");
  photographerDetailsContainer.appendChild(locationParagraph);

  // Créer un paragraphe pour afficher la tagline du photographe
  const taglineParagraph = document.createElement("p");
  taglineParagraph.textContent = photographer.tagline;
  taglineParagraph.classList.add("tagline");
  photographerDetailsContainer.appendChild(taglineParagraph);
}

// Fonction pour afficher les médias du photographe
export function displayMedia(mediaContainer, photographerData) {
  // Parcourir tous les médias du photographe
  photographerData.media.forEach((mediaItem, index) => {
    // Créer un élément de média approprié en fonction du type (image ou vidéo)
    const mediaElement = createMediaElement(mediaItem, photographerData.photographer.name);

    // Ajouter l'élément de média au conteneur
    mediaContainer.appendChild(mediaElement);

    // Ajouter un événement de clic pour ouvrir la lightbox
    mediaElement.addEventListener('click', (e) => {
      if (!e.target.closest('.like-button')) { // Vérifier si le clic n'a pas été effectué sur un bouton "J'aime" ou un autre élément interactif
        e.preventDefault();
        const lightbox = createLightbox(index, photographerData.media, photographerData.photographer.name);
        document.body.appendChild(lightbox);
      }
    });

    // Ajouter un événement pour la touche Entrée
    mediaElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.target.closest('.like-button')) { // Vérifier si la touche Entrée n'a pas été pressée sur un bouton "J'aime" ou un autre élément interactif
        e.preventDefault();
        const lightbox = createLightbox(index, photographerData.media, photographerData.photographer.name);
        document.body.appendChild(lightbox);
      }
    });
  });
}
