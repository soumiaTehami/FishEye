// Extraire l'ID du photographe de l'URL
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

// Fonction pour récupérer les données du photographe depuis le fichier JSON
async function getPhotographerData(id) {
  try {
    const response = await fetch(`data/photographers.json`);
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

// Fonction pour afficher les informations du photographe sur la page HTML
function displayPhotos(photographer) {
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
function displayMedia(mediaContainer, photographerData) {
  // Parcourir tous les médias du photographe
  photographerData.media.forEach((mediaItem) => {
    // Créer un élément de média approprié en fonction du type (image ou vidéo)
    const mediaElement = createMediaElement(
      mediaItem,
      photographerData.photographer.name
    );
    // Ajouter l'élément de média au conteneur
    mediaContainer.appendChild(mediaElement);
  });
}

// Fonction pour créer un élément de média (image ou vidéo)
function createMediaElement(media, namePhotographe) {
  console.log(media);
  console.log(namePhotographe);
  // Créer le conteneur pour le média
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-element")

  if (media.image) {
    const img = document.createElement("img");
    img.src = `assets/images/${namePhotographe}/${media.image}`;
    img.alt = media.title;
    mediaContainer.appendChild(img);
  } else if (media.video) {
    const video = document.createElement("video");
    video.src = `assets/images/${namePhotographe}/${media.video}`;
    video.alt = media.title;
    video.controls = true;
    mediaContainer.appendChild(video);
  } else {
    // Gestion pour les autres types de médias
    console.error("Type de média non pris en charge:", media.type);
    // Vous pouvez afficher un message d'erreur ou créer un élément générique pour ce type de média
    const unsupportedMedia = document.createElement("p");
    unsupportedMedia.textContent = "Type de média non pris en charge";
    mediaContainer.appendChild(unsupportedMedia);
  }

 // Créer une div pour le titre
const titleDiv = document.createElement("div");
titleDiv.classList.add("media-title");
mediaContainer.appendChild(titleDiv);


if (media.title) {
  const titleParagraph = document.createElement("p");
  titleParagraph.textContent = `${media.title} `; // Supposant que le prix est en euros
  titleDiv.appendChild(titleParagraph);
}
const titleAndLikeContainer = document.createElement("div");
titleAndLikeContainer.classList.add("title-and-like-container");

const likeDiv = document.createElement("div");
const likeCount = media.likes || 0; // Récupérer le nombre de likes ou définir à 0 s'il n'y en a pas
  mediaContainer.dataset.likes = likeCount;
const likeCountSpan = document.createElement("span");
  likeCountSpan.textContent = `${media.likes || 0} `;
  likeDiv.appendChild(likeCountSpan);

  const likeButton = document.createElement("button");
  likeButton.textContent = "❤️"; // Utilisation de l'icône de cœur
  likeButton.classList.add("like-button");
  likeButton.addEventListener("click", () => {
    media.likes = (media.likes || 0) + 1;
    likeCountSpan.textContent = `${media.likes}`;
  });
  likeDiv.appendChild(likeButton);
  titleAndLikeContainer.appendChild(likeDiv)
  titleDiv.appendChild(titleAndLikeContainer);
  return mediaContainer;
}


// Fonction pour afficher le tarif journalier du photographe sur la page HTML

function displayTarif(tarif) {
  const tarifContainer = document.querySelector(".tarif-container");
  const tarifValue = document.createElement("p");

  // Calculer le nombre total de likes
  let totalLikes = 0;

  // Sélectionner tous les médias
  const mediaElements = document.querySelectorAll(".media-element");

  // Parcourir chaque média
  mediaElements.forEach(mediaElement => {
    // Récupérer le nombre de likes de ce média
    const likeCount = parseInt(mediaElement.dataset.likes);

    // Vérifier si le nombre de likes est un nombre valide
    if (!isNaN(likeCount)) {
      // Ajouter le nombre de likes au total
      totalLikes += likeCount;
    }
  });

  const heartSymbol = document.createElement("span");
  heartSymbol.textContent = " \u2665"; // Caractère Unicode pour un cœur noir
  heartSymbol.style.color = "black"; // Style du cœur noir

  // Afficher le tarif avec le nombre total de likes et le symbole de cœur noir
  tarifValue.textContent = `${totalLikes}${heartSymbol.textContent}          ${tarif} €/jour`;

  // Ajouter une classe au paragraphe
  tarifValue.classList.add("tarif-text");

  // Ajouter le tarif au conteneur
  tarifContainer.appendChild(tarifValue);
}





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
