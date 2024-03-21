// Mettre le code JavaScript lié à la page photographer.html
const searchParams = new URLSearchParams(window.location.search);

// Accéder à un paramètre spécifique
const id = searchParams.get("id");

// Utiliser les valeurs des paramètres
console.log("ID:", id);

async function getPhotographerData(id) {
    try {
        const response = await fetch(`data/photographers.json`);
        const data = await response.json();
        console.log("Données récupérées :", data);
        const photographer = data.photographers.find(photographer => photographer.id == id);
        console.log("Données récupérées :", photographer);
        if (photographer) {
            return photographer;
        } else {
            throw new Error('Photographe non trouvé');
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données du photographe :', error);
    }
    
}

// Appel de la fonction pour récupérer les données du photographe
getPhotographerData(id)
    .then(data => {
        if (data) {
            displayPhotos(data);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données du photographe :', error);
    });

    

    
    
