
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
    const allmedia=document.querySelectorAll(".image-wrapper");
    allmedia.forEach((media,index)=>{
      media.addEventListener('click',(e)=>{
        e.preventDefault();
          const lightbox = createLightbox(index, photographerData.media, photographerData.photographer.name);
          document.body.appendChild(lightbox);
          
      })
    })
    
    
  }