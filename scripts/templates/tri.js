// Fonction pour trier les médias par titre
function sortByTitle(media) {
    return media.slice().sort((a, b) => (a.title || '').localeCompare(b.title || ''));
}

// Fonction pour trier les médias par date
function sortByDate(media) {
    return media.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Fonction pour trier les médias par nombre de likes
function sortByLikes(media) {
    return media.slice().sort((a, b) => (a.likes || 0) - (b.likes || 0));
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("sort-by-dropdown");
    const mediaContainer = document.querySelector(".media-gallery"); // Correction : utiliser ".media-gallery" au lieu de ".media-element"

    // Appel initial pour trier les médias lors du chargement de la page
    sortMedia(media);

    dropdown.addEventListener("change", function () {
        sortMedia(media);
    });

    function sortMedia(media) {
        const selectedValue = dropdown.value;
        let sortedMedia;

        switch (selectedValue) {
            case "date":
                sortedMedia = sortByDate(media);
                break;
            case "title":
                sortedMedia = sortByTitle(media);
                break;
            case "likes":
                sortedMedia = sortByLikes(media);
                break;
            default:
                sortedMedia = media;
        }

        // Vérifier si le conteneur des médias existe
        if (mediaContainer) {
            // Vider le conteneur des médias
            clearMediaContainer(mediaContainer);

            // Mettre à jour l'affichage des médias triés
            sortedMedia.forEach((media) => {
                const mediaElement = createMediaElement(media, namePhotographe);
                mediaContainer.appendChild(mediaElement);
            });
        } else {
            console.error("Le conteneur des médias est null.");
        }
    }

    // Fonction pour vider le conteneur des médias
    function clearMediaContainer(container) {
        container.innerHTML = "";
    }
});
