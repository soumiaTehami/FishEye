function sortMediaElements(sortBy) {
  const gallery = document.getElementById('photographer_gallery');
  const mediaElements = gallery.querySelectorAll('.media-element');

  // Convertir la NodeList en un tableau pour faciliter le tri
  const mediaArray = Array.from(mediaElements);

  // Triez les éléments en fonction de la propriété spécifiée (titre, date, likes)
  mediaArray.sort((a, b) => {
      const aDate = new Date(a.dataset.date);
      const bDate = new Date(b.dataset.date);

      if (sortBy === 'date') {
          return bDate - aDate; // Tri par date décroissante
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
  mediaArray.forEach((mediaElement) => {
      gallery.appendChild(mediaElement);
  });
}

export { sortMediaElements };
