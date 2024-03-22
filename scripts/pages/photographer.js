// Mettre le code JavaScript lié à la page photographer.html
const searchParams = new URLSearchParams(window.location.search);

// Accéder à un paramètre spécifique
const id = searchParams.get("id");
// Utiliser les valeurs des paramètres
console.log("ID:", id);

async function getPhotographerData(id) {
  try {
    const response = await fetch(`data/photographers.json`);
    const data = await response.json();
    console.log("Données récupérées :", data);
    const photographer = data.photographers.find(
      (photographer) => photographer.id == id
    );
    console.log("Données récupérées :", photographer);
    if (photographer) {
      return photographer;
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
//Appel de la fonction pour récupérer les données du photographe
getPhotographerData(id)
  .then((data) => {
    if (data) {
      displayPhotos(data);
    }
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la récupération des données du photographe :",
      error
    );
  });

  function displayPhotos(photographer) {
    const gallery = document.querySelector(".photograph-header");
  
    // Créer le conteneur pour les détails du photographe
    const photographerDetailsContainer = document.createElement("div");
    photographerDetailsContainer.classList.add("photographer-details");
    gallery.appendChild(photographerDetailsContainer);
  
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
    photographerDetailsContainer.appendChild(locationParagraph);
  
    // Créer un paragraphe pour afficher la tagline du photographe
    const taglineParagraph = document.createElement("p");
    taglineParagraph.textContent = photographer.tagline;
    photographerDetailsContainer.appendChild(taglineParagraph);
  
    // Afficher les autres médias
    if (photographer && photographer.media) {
      if (photographer.media.length > 0) {
        photographer.media.forEach((media) => {
          const mediaElement = createMediaElement(media);
          if (mediaElement) {
            gallery.appendChild(mediaElement);
          }
        });
      } else {
        console.error("Aucun média disponible pour ce photographe.");
      }
    }
  }
  
  // Fonction pour créer un élément de média (image ou vidéo)
  function createMediaElement(media) {
    if (media.image) {
      const img = document.createElement("img");
      img.src = `assets/images/${media.image}`;
      img.alt = media.title;
      return img;
    } else if (media.video) {
      const video = document.createElement("video");
      video.src = `assets/videos/${media.video}`;
      video.alt = media.title;
      video.controls = true;
      return video;
    }
  }
  