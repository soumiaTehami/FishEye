function photographerTemplate(data) {
    const { name, portrait, tagline, price, country } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
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

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pCountry);
        article.appendChild(h3);
        article.appendChild(pPrice);

        return article;
    }

    return { name, picture, tagline, price, country, getUserCardDOM };
}
