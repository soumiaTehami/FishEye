function createLightbox(index, mediaList, photographerName) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  let currentIndex = index; // Index du média actuellement affiché

  // Fonction pour afficher le média à l'index spécifié
  function displayMedia(index) {
    // Supprimer le contenu précédent de la Lightbox
    lightbox.innerHTML = "";

    const media = mediaList[index];

    if (media.image) {
      // Afficher l'image
      const fullscreenImage = document.createElement("img");
      fullscreenImage.src = `assets/images/${photographerName}/${media.image}`;
      fullscreenImage.alt = media.title || "";
      fullscreenImage.classList.add("fullscreen-media");
      lightbox.appendChild(fullscreenImage);
    } else if (media.video) {
      // Afficher la vidéo
      const fullscreenVideo = document.createElement("video");
      fullscreenVideo.src = `assets/images/${photographerName}/${media.video}`;
      fullscreenVideo.ariaLabel = media.title || "";
      fullscreenVideo.controls = true;
      fullscreenVideo.classList.add("fullscreen-media");
      lightbox.appendChild(fullscreenVideo);
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
