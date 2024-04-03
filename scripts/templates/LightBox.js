function createLightbox(index,mediaList, photographerName) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    let currentIndex = index; // Index du média actuellement affiché
 console.log(mediaList.length);
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
            fullscreenVideo.ariaLabel = media.title || '';
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
    prevButton.innerHTML = "<";
    prevButton.classList.add("nav-button", "left");
    prevButton.addEventListener("click", () => {
         currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length; // Passage circulaire
        console.log(currentIndex);
        displayMedia(currentIndex);
    });
    lightbox.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.innerHTML = ">";
    nextButton.classList.add("nav-button", "right");
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % mediaList.length; // Passage circulaire
        displayMedia(currentIndex);
    });
    lightbox.appendChild(nextButton);

    // Ajouter la Lightbox à la page
    document.body.appendChild(lightbox);

    return lightbox;
}
