async function getPhotographers() {
    // Code pour récupérer les données des photographes
    const response = await fetch('/data/photographers.json');
    const data = await response.json();
    return data.photographers;
}

async function displayData(photographers) {
    // Vérifier si photographers est défini
    if (photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
    console.log(photographers)
}

init();

