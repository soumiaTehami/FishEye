// Fonction pour trier les éléments de média
function sortMediaElements(sortBy, dataMedia, namePhotograph) {
  const gallery = document.getElementById('photographer_gallery');
  const mediaElements = dataMedia.slice(); // Copie le tableau de données pour éviter la modification de l'original
  console.log(mediaElements);

  // Trie les éléments en fonction de la propriété spécifiée (titre, date, likes)
  mediaElements.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'likes') {
      return (b.likes || 0) - (a.likes || 0); // Tri en fonction du nombre de likes, en prenant en compte le cas où la propriété likes est absente
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      // Si la propriété de tri n'est pas reconnue, maintient l'ordre existant
      return 0;
    }
  });
  console.log(mediaElements);
  // Crée un nouvel ordre d'affichage
  const newGallery = document.createElement('div');
  newGallery.id = 'photographer_gallery';

  // Ajoute les médias triés au nouvel élément de galerie
  mediaElements.forEach((media) => {
    const mediaElement = createMediaElement(media, namePhotograph); // Utilise la fonction createMediaElement pour créer un élément de média
    newGallery.appendChild(mediaElement);
  });

  // Remplace l'ancienne galerie par la nouvelle
  gallery.parentNode.replaceChild(newGallery, gallery);
}

function createMediaElement(media, namePhotograph) {
   
  // Créer le conteneur pour le média
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-element");

  if (media.image) {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-wrapper");
    const img = document.createElement("img");
    img.src = `assets/images/${namePhotograph}/${media.image}`;
    img.alt = media.title;
    imageDiv.appendChild(img);
    mediaContainer.appendChild(imageDiv);
  } else if (media.video) {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-wrapper");
    const video = document.createElement("video");
    video.src = `assets/images/${namePhotograph}/${media.video}`;
    video.alt = media.title;
    video.controls = true;
    imageDiv.appendChild(video);
    mediaContainer.appendChild(imageDiv);
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
  likeButton.disabled = true; // Désactiver le bouton de like une fois cliqué
});
likeDiv.appendChild(likeButton);
titleAndLikeContainer.appendChild(likeDiv);
titleDiv.appendChild(titleAndLikeContainer);
return mediaContainer;
}

export { sortMediaElements };
