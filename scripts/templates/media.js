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
      // Rendre l'image accessible au clavier en lui donnant un attribut tabindex
      img.tabIndex = 0;
      imageDiv.appendChild(img);
      mediaContainer.appendChild(imageDiv);
  } else if (media.video) {
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image-wrapper");
      const video = document.createElement("video");
      video.src = `assets/images/${namePhotographe}/${media.video}`;
      video.alt = media.title;
      video.controls = true;
      video.tabIndex = 0;
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
  heartIcon.textContent = "\u2764"; // Utilisation de l'icône de cœur
  heartIcon.style.color = "#901c1c";
  heartIcon.tabIndex = 0;
  // Ajout d'une classe pour identifier le cœur et appliquer un style CSS
  heartIcon.classList.add("heart-icon");
  
  likeButton.appendChild(heartIcon);

  // Gestion du like
  let liked = false; // Variable pour suivre l'état du like

  likeButton.addEventListener("click", () => {
      if (!liked) {
          media.likes = (media.likes || 0) + 1;
          likeCountSpan.textContent = `${media.likes}`;
          liked = true;
      } else {
          media.likes = (media.likes || 0) - 1; // Diminuer le nombre de likes
          likeCountSpan.textContent = `${media.likes}`;
          liked = false;
      }
  });

  likeDiv.appendChild(likeButton);

  // Ajouter le conteneur de likes au conteneur de titre et likes
  titleAndLikeContainer.appendChild(likeDiv);

  // Ajouter le conteneur de titre et likes au conteneur principal
  titleDiv.appendChild(titleAndLikeContainer);

  return mediaContainer;
}
