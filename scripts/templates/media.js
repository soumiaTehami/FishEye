export function createMediaElement(media, namePhotographe) {
    // Créer le conteneur pour le média
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-element");
  
    if (media.image) {
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image-wrapper");
      const img = document.createElement("img");
      img.src = `assets/images/${namePhotographe}/${media.image}`;
      img.alt = media.title;
      imageDiv.appendChild(img);
      mediaContainer.appendChild(imageDiv);
    } else if (media.video) {
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image-wrapper");
      const video = document.createElement("video");
      video.src = `assets/images/${namePhotographe}/${media.video}`;
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

    // Ajouter la date
    if (media.date) {
      const dateParagraph = document.createElement("p");
      dateParagraph.textContent = `Date: ${media.date}`; // Ajouter la date ici
      dateParagraph.classList.add("hidden-date");
      mediaContainer.appendChild(dateParagraph);
    }

    // Créer un conteneur pour le titre et le nombre de likes
    const titleAndLikeContainer = document.createElement("div");
    titleAndLikeContainer.classList.add("title-and-like-container");

    // Créer un conteneur pour le nombre de likes
    const likeDiv = document.createElement("div");
    const likeCount = media.likes || 0; // Récupérer le nombre de likes ou définir à 0 s'il n'y en a pas
    mediaContainer.dataset.likes = likeCount;
    const likeCountSpan = document.createElement("span");
    likeCountSpan.textContent = `${media.likes || 0} `;
    likeDiv.appendChild(likeCountSpan);

    // Créer un bouton de like
    const likeButton = document.createElement("button"); // Création du bouton de like
    likeButton.classList.add("like-button");

    // Création d'un conteneur span pour le cœur
    const heartIcon = document.createElement("span");
    heartIcon.textContent = "❤️"; // Utilisation de l'icône de cœur

    // Ajout d'une classe pour identifier le cœur et appliquer un style CSS
    heartIcon.classList.add("heart-icon");
    heartIcon.style.color = "#901c1c"; // Changer la couleur du cœur en rouge foncé

    likeButton.appendChild(heartIcon);

    likeButton.addEventListener("click", () => {
      media.likes = (media.likes || 0) + 1;
      likeCountSpan.textContent = `${media.likes}`;
      likeButton.disabled = true; // Désactiver le bouton de like une fois cliqué
    });

    likeDiv.appendChild(likeButton);

    // Ajouter le conteneur de likes au conteneur de titre et likes
    titleAndLikeContainer.appendChild(likeDiv);

    // Ajouter le conteneur de titre et likes au conteneur principal
    titleDiv.appendChild(titleAndLikeContainer);

    return mediaContainer;
}
