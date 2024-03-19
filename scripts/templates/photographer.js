function photographerTemplate(data) {
    const { name, portrait, tagline, price, country } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${name} - ${tagline}`);
        img.classList.add("photographer-image");
        
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.classList.add("photographer-name");
        
        const pCountry = document.createElement('p');
        pCountry.textContent = `Country: ${country}`;
        pCountry.classList.add("photographer-country");
        
        const h3 = document.createElement('h3');
        h3.textContent = tagline;
        h3.classList.add("photographer-tagline");

        const pPrice = document.createElement('p');
        pPrice.textContent = `Price: ${price} € / day`;
        pPrice.classList.add("photographer-price");

        // Ajouter une classe à l'élément article
        article.classList.add("photographer-card");

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCountry);
        article.appendChild(h3);
        article.appendChild(pPrice);

        return article;
    }

    return { name, picture, tagline, price, country, getUserCardDOM };
}
const searchParams = new URLSearchParams(window.location.search);

// Accéder à un paramètre spécifique
const id = searchParams.get("id");
const category = searchParams.get("category");

// Utiliser les valeurs des paramètres
console.log("ID:", id);
console.log("Category:", category);
// Récupérer tous les éléments avec la classe "photographer"
const photographers = document.querySelectorAll(".photographer-card");

// Ajouter un gestionnaire d'événements à chaque photographe
photographers.forEach((photographer) => {
  photographer.addEventListener("click", () => {
    // Récupérer l'ID du photographe à partir de l'attribut data-id
    const photographerId = photographer.getAttribute("id");
    // Rediriger vers la page de détails avec l'ID du photographe comme paramètre d'URL
    window.location.href = `photographer.html?id=${photographerId}`;
    console.log(photographerId)
  });
});