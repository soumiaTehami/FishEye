function createLightbox(mediaList, photographerName) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    let currentIndex = 0; // Index du média actuellement affiché

    // Fonction pour afficher le média à l'index spécifié
    function displayMedia(index) {
        // Supprimer le contenu précédent de la Lightbox
        lightbox.innerHTML = "";

        const media = mediaList[index];

        if (media.image) {
            // Afficher l'image
            const fullscreenImage = document.createElement("img");
            fullscreenImage.src = `assets/images/${photographerName}/${media.image}`;
            fullscreenImage.alt = media.title || '';
            fullscreenImage.classList.add("fullscreen-media");
            lightbox.appendChild(fullscreenImage);
        } else if (media.video) {
            // Afficher la vidéo
            const fullscreenVideo = document.createElement("video");
            fullscreenVideo.src = `assets/images/${photographerName}/${media.video}`;
            fullscreenVideo.alt = media.title || '';
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
    }

    // Afficher le premier média lors de l'ouverture de la Lightbox
    displayMedia(currentIndex);

    // Ajouter des boutons pour la navigation entre les médias
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&lt;"; // Flèche gauche
    prevButton.classList.add("nav-button");
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length; // Passage circulaire
        displayMedia(currentIndex);
    });
    lightbox.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&gt;"; // Flèche droite
    nextButton.classList.add("nav-button");
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % mediaList.length; // Passage circulaire
        displayMedia(currentIndex);
    });
    lightbox.appendChild(nextButton);

    // Ajouter la Lightbox à la page
    document.body.appendChild(lightbox);

    // Ajouter des événements de clic pour chaque élément de la galerie
    // Ajouter des événements de clic pour chaque élément de la galerie
mediaList.forEach((media, index) => {
    const container = document.createElement("div");
    container.classList.add("media-container");
    container.addEventListener("click", (event) => {
        // Vérifier si l'élément cliqué est le bouton de like
        if (!event.target.classList.contains("like-button")) {
            displayMedia(index);
        }
    });
    lightbox.appendChild(container);
});


    return lightbox;
}
