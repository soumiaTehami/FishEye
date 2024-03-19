function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
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
function handleSubmit(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire
    if (validateForm()) {
        const formData = new FormData(event.target); // Récupérer les données du formulaire
        const formDataObject = Object.fromEntries(formData.entries()); // Convertir les données en objet JavaScript
        console.log(formDataObject); // Afficher les données dans la console
        // Ajoutez ici le code pour envoyer les données du formulaire (par exemple, à un serveur)
    }
}

// Ajouter un écouteur d'événement pour la soumission du formulaire
const contactForm = document.getElementById('contact_form');
contactForm.addEventListener('submit', handleSubmit);