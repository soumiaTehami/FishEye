import { photographerTemplate } from "../templates/photographer.js";
async function getPhotographers() {
  // Code pour récupérer les données des photographes
    try {
        const response = await fetch("data/photographers.json");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données JSON');
        }
        const data = await response.json();
        return data.photographers;
    } catch (error) {
        console.error('Erreur fetch :', error);
        return []; // Retourner une liste vide en cas d'erreur
    }
}


async function displayData(photographers) {
  // Vérifier si photographers est défini
  if (photographers) {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

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
  console.log(photographers);
}

init();
