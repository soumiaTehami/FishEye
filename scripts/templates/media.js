// Fonction pour créer un élément de média (image ou vidéo)
function createMediaElement(media, namePhotographe) {
    console.log(media);
    console.log(namePhotographe);
    // Créer le conteneur pour le média
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-element");
  
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
    likeButton.disabled = true; // Désactiver le bouton de like une fois cliqué
  });
  likeDiv.appendChild(likeButton);
  titleAndLikeContainer.appendChild(likeDiv);
  titleDiv.appendChild(titleAndLikeContainer);
  // Ajouter un événement de clic pour ouvrir la Lightbox
  mediaContainer.addEventListener("click", () => {
    const lightbox = createLightbox([media], namePhotographe);
    document.body.appendChild(lightbox);
  });
  return mediaContainer;
}

