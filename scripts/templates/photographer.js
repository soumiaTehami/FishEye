function photographerTemplate(data) {
    const { name, portrait, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        
        const h2 = document.createElement('h2');
        h2.textContent = name;

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;

        const pPrice = document.createElement('p');
        pPrice.textContent = `Tarif : ${price} € / jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return article;
    }

    return { name, picture, tagline, price, getUserCardDOM };
}
