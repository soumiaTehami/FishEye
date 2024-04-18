export function displayTarif(tarif) {
    const tarifContainer = document.querySelector(".tarif-container");
    const tarifLikesContainer = document.createElement("div");
    tarifLikesContainer.classList.add("tarif-likes-container");
  
    // Création d'un span pour afficher le nombre total de likes
    const totalLikesSpan = document.createElement("span");
    totalLikesSpan.classList.add("total-likes");
    tarifLikesContainer.appendChild(totalLikesSpan);
  
    // Création du cœur pour représenter les likes
    const heartSymbol = document.createElement("span");
    heartSymbol.textContent = " \u2665"; // Caractère Unicode pour un cœur noir
    tarifLikesContainer.appendChild(heartSymbol);
  
    // Calcul du nombre total de likes
    let totalLikes = 0;
    const mediaElements = document.querySelectorAll(".media-element");
  
    mediaElements.forEach((mediaElement) => {
      const likeCount = parseInt(mediaElement.dataset.likes);
      if (!isNaN(likeCount)) {
        totalLikes += likeCount;
      }
    });
  
    // Mise à jour du contenu du span avec le nombre total de likes
    totalLikesSpan.textContent = totalLikes;
  
    // Création du paragraphe pour afficher le tarif
    const tarifValue = document.createElement("p");
    tarifValue.textContent = `${tarif} €/jour`;
    tarifValue.classList.add("tarif-text");
    tarifLikesContainer.appendChild(tarifValue);
  
    // Ajout de la div de regroupement au conteneur principal
    tarifContainer.appendChild(tarifLikesContainer);
  
    // Mise à jour du nombre total de likes à chaque clic sur un bouton de like
    const likeButtons = document.querySelectorAll(".like-button");
  
    likeButtons.forEach((likeButton) => {
      likeButton.addEventListener("click", () => {
        totalLikes++;
        totalLikesSpan.textContent = totalLikes;
      });
    });
  }