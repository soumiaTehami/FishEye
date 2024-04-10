// Fonction pour trier les éléments de la galerie
function sortMediaElements(sortBy) {
  const gallery = document.getElementById('photographer_gallery');
  const mediaElements = Array.from(gallery.querySelectorAll('.media-element'));

  mediaElements.sort((a, b) => {
    // Extraire les dates des éléments a et b en utilisant des expressions régulières
    const aDateText = a.innerHTML.match(/Date:\s(\d{4}-\d{2}-\d{2})/)[1];
    const bDateText = b.innerHTML.match(/Date:\s(\d{4}-\d{2}-\d{2})/)[1];

    // Convertir les dates en objets Date
    const aDate = new Date(aDateText);
    const bDate = new Date(bDateText);

    if (sortBy === 'date') {
      return bDate.getTime() - aDate.getTime(); // Tri par date décroissante
    } else if (sortBy === 'likes') {
      const aLikes = parseInt(a.dataset.likes) || 0;
      const bLikes = parseInt(b.dataset.likes) || 0;
      return bLikes - aLikes; // Tri par likes décroissants
    } else if (sortBy === 'title') {
      const aTitle = a.querySelector('.media-title p').textContent;
      const bTitle = b.querySelector('.media-title p').textContent;
      return aTitle.localeCompare(bTitle); // Tri par titre alphabétique
    } else {
      // Si la propriété de tri n'est pas reconnue, maintient l'ordre existant
      return 0;
    }
  });

  // Mettre à jour l'ordre des éléments dans la galerie
  mediaElements.forEach((mediaElement) => {
    gallery.appendChild(mediaElement);
  });
}


export { sortMediaElements };
