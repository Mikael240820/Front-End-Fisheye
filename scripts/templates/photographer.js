function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `/assets/photographers/${portrait}`;

    /**
     * Génère le DOM pour la carte d'un photographe
     * 
     * @param {Object} options - Options de configuration
     * @param {string} [options.titleTag='h1'] - Balise HTML pour le nom du photographe
     * @param {boolean} [options.withLink=true] - Si true, entoure la carte d'un lien vers le profil
     * @param {boolean} [options.withPrice=true] - Si true, affiche le tarif journalier
     * @returns {HTMLElement} - Élément DOM (article ou lien contenant l'article)
     */
    function getUserCardDOM(options = {}) {
        const {
            titleTag = 'h1',
            withLink = true,
            withPrice = true
        } = options;

        const article = document.createElement('article');
        article.classList.add('photographer');
        article.setAttribute('aria-labelledby', `photographer-name-${id}`);

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', '');
        article.appendChild(img);

        const info = document.createElement('div');
        info.classList.add('photographer_info');

        const title = document.createElement(titleTag);
        title.textContent = name;
        title.setAttribute('id', `photographer-name-${id}`);
        info.appendChild(title);

        const address = document.createElement('address');
        address.textContent = `${city}, ${country}`;
        info.appendChild(address);

        const p = document.createElement('p');
        p.textContent = tagline;
        info.appendChild(p);

        if (withPrice) {
            const small = document.createElement('small');
            small.textContent = `${price}€/jour`;
            info.appendChild(small);
        }

        article.appendChild(info);

        if (withLink) {
            const a = document.createElement('a');
            a.setAttribute('href', `photographer.html?id=${id}`);
            a.setAttribute('aria-label', `Accéder au profil de ${name}, photographe à ${city}`);
            a.appendChild(article);
            return a;
        }
        
        return article;
    }

    return { name, picture, getUserCardDOM }
}
