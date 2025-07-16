function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('aria-label', `Accéder au profil de ${name}, photographe à ${city}`);

        const article = document.createElement('article');
        article.classList.add('photographer');
        article.setAttribute('aria-labelledby', `photographer-name-${id}`);

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        article.appendChild(img);

        const info = document.createElement('div');
        info.classList.add('photographer_info');

        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('id', `photographer-name-${id}`);
        info.appendChild(h2);

        const address = document.createElement('address');
        address.textContent = `${city}, ${country}`;
        info.appendChild(address);

        const p = document.createElement('p');
        p.textContent = tagline;
        info.appendChild(p);

        const small = document.createElement('small');
        small.textContent = `${price}€/jour`;
        info.appendChild(small);

        article.appendChild(info);
        a.appendChild(article);
        
        return a;
    }

    return { name, picture, getUserCardDOM }
}
