const modal = document.getElementById("contact_modal");
const closeButton = document.querySelector('img[src="assets/icons/close.svg"]');

// Définir l'attribut tabindex sur le bouton
modal.setAttribute("tabindex", "0");

// Ajouter un écouteur d'événements pour ouvrir le modal lorsque le bouton est cliqué
document.querySelector('.contact_button').addEventListener('click', function() {
    displayModal();
});

// Ajouter un écouteur d'événements pour détecter la touche "Entrée" sur le modal
modal.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        closeModal(); // Fermer le modal lorsqu'on appuie sur "Entrée"
    }
});

// Ajouter un écouteur d'événements pour fermer le modal lorsqu'on clique sur l'icône de fermeture
closeButton.addEventListener('click', closeModal);

// Affichage du modal
function displayModal() {
    modal.style.display = "block";
    modal.focus(); // Focus sur le modal après l'avoir ouvert
}

// Fermeture du modal
function closeModal() {
    modal.style.display = "none";
}

// Fonction pour vérifier le formulaire avant la soumission
function validateForm() {
    // Récupérer les champs du formulaire
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Vérifier si les champs sont vides
    if (!firstName || !lastName || !email || !message) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return false; // Empêcher la soumission du formulaire
    }

    // Vérifier que les noms et prénoms ont au moins 2 caractères
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        alert('Les noms et prénoms doivent avoir au moins 2 caractères alphabétiques.');
        return false; // Empêcher la soumission du formulaire
    }

    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez saisir une adresse email valide.');
        return false; // Empêcher la soumission du formulaire
    }

    // Si toutes les validations sont passées, retourner vrai pour autoriser la soumission du formulaire
    return true;
}

// Soumission du formulaire
function handleSubmit(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire
    if (validateForm()) {
        const formData = new FormData(event.target); // Récupérer les données du formulaire
        const formDataObject = Object.fromEntries(formData.entries()); // Convertir les données en objet JavaScript
        console.log(formDataObject); // Afficher les données dans la console
        // Ajoutez ici le code pour envoyer les données du formulaire (par exemple, à un serveur)

        // Réinitialiser le formulaire après la soumission réussie
        event.target.reset();
    }
}

// Ajout d'un écouteur d'événement pour la soumission du formulaire
const contactForm = document.getElementById('contact_form');
contactForm.addEventListener('submit', handleSubmit);
