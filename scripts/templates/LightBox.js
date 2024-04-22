export function createLightbox(index, mediaList, photographerName) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  let currentIndex = index; // Index du média actuellement affiché

  // Fonction pour afficher le média à l'index spécifié
  function displayMedia(index) {
    // Supprimer le contenu précédent de la Lightbox
    lightbox.innerHTML = "";

    const media = mediaList[index];

    if (media.image) {
      const fullscreenImageContainer = document.createElement("div");
      fullscreenImageContainer.classList.add("media-container");

      const fullscreenImage = document.createElement("img");
      fullscreenImage.src = `assets/images/${photographerName}/${media.image}`;
      fullscreenImage.alt = media.title || "";
      fullscreenImage.classList.add("fullscreen-media");
      fullscreenImageContainer.appendChild(fullscreenImage);

      // Ajouter le titre de l'image
      const imageTitle = document.createElement("div");
      imageTitle.textContent = media.title || "";
      imageTitle.classList.add("media-title");
      fullscreenImageContainer.appendChild(imageTitle);

      lightbox.appendChild(fullscreenImageContainer);
    } else if (media.video) {
      const fullscreenVideoContainer = document.createElement("div");
      fullscreenVideoContainer.classList.add("media-container");

      const fullscreenVideo = document.createElement("video");
      fullscreenVideo.src = `assets/images/${photographerName}/${media.video}`;
      fullscreenVideo.ariaLabel = media.title || "";
      fullscreenVideo.controls = true;
      fullscreenVideo.classList.add("fullscreen-media");
      fullscreenVideoContainer.appendChild(fullscreenVideo);

      // Ajouter le titre de la vidéo
      const videoTitle = document.createElement("div");
      videoTitle.textContent = media.title || "";
      videoTitle.classList.add("media-title");
      fullscreenVideoContainer.appendChild(videoTitle);

      lightbox.appendChild(fullscreenVideoContainer);
    }

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", () => {
      lightbox.remove();
    });
    lightbox.appendChild(closeButton);

    // Mettre à jour l'index actuel
    currentIndex = index;

    // Vérifier si les boutons de navigation existent déjà
    // S'ils existent, les supprimer avant d'ajouter les nouveaux boutons
    const existingPrevButton = lightbox.querySelector(".nav-button.left");
    if (existingPrevButton) {
      existingPrevButton.remove();
    }
    const existingNextButton = lightbox.querySelector(".nav-button.right");
    if (existingNextButton) {
      existingNextButton.remove();
    }

    // Ajouter des boutons pour la navigation entre les médias
    const prevButton = createPrevButton();
    lightbox.appendChild(prevButton);

    const nextButton = createNextButton();
    lightbox.appendChild(nextButton);
  }

  // Afficher le premier média lors de l'ouverture de la Lightbox
  displayMedia(currentIndex);

  // Fonction pour créer le bouton précédent
  function createPrevButton() {
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "<";
    prevButton.classList.add("nav-button", "left");
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length; // Passage circulaire
      displayMedia(currentIndex);
    });
    return prevButton;
  }

  // Fonction pour créer le bouton suivant
  function createNextButton() {
    const nextButton = document.createElement("button");
    nextButton.innerHTML = ">";
    nextButton.classList.add("nav-button", "right");
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % mediaList.length; // Passage circulaire
      displayMedia(currentIndex);
    });
    return nextButton;
  }

  // Ajouter la Lightbox à la page
  document.body.appendChild(lightbox);

  // Gestion des touches du clavier
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      // Aller au média précédent
      currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
      displayMedia(currentIndex);
    } else if (event.key === "ArrowRight") {
      // Aller au média suivant
      currentIndex = (currentIndex + 1) % mediaList.length;
      displayMedia(currentIndex);
    }
  });

  return lightbox;
}
