function createLightbox(mediaList, photographerName) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
  
    mediaList.forEach((media) => {
        const fullscreenImage = document.createElement("img");
        fullscreenImage.src = `assets/images/${photographerName}/${media.image}`; // Assurez-vous de changer cet accès en fonction de votre structure de répertoires
        fullscreenImage.alt = media.title || '';
        fullscreenImage.classList.add("fullscreen-image");
  
        const closeButton = document.createElement("button");
        closeButton.textContent = "Fermer";
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", () => {
          lightbox.remove();
        });
  
        lightbox.appendChild(fullscreenImage);
        lightbox.appendChild(closeButton);
  
        document.body.appendChild(lightbox);
    });
  
    return lightbox;
}