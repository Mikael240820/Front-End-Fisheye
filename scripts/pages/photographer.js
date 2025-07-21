let photographerMedias = [];

async function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector('.photograph_header');
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM({withLink: false, withPrice: false});
    photographerHeader.appendChild(userCardDOM);
}

async function displayPhotographerMedias(medias) {
    const photographMedias = document.querySelector('.photograph_medias');

    medias.forEach((media) => {
        const mediaModel = mediaTemplate(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        photographMedias.appendChild(mediaCardDOM);
    });
}

function displayModalPhotographName(photographer) {
    const modalPhotographName = document.getElementById('modal_photograph_name');
    modalPhotographName.innerText = photographer.name;
}

function displayLikesPriceInfos(photographer, medias) {
    const photographPrice = document.getElementById('photograph_price');
    const photographLikes = document.getElementById('photograph_likes');
    
    photographPrice.innerText = `${photographer.price}€ / jour`;

    let nbLikes = 0;
    medias.forEach((media) => nbLikes += media.likes);
    photographLikes.innerHTML = `${nbLikes} <img src="assets/icons/heart.svg" alt="">`;
}

async function displayData(photographer, medias) {
    // Stocker les médias globalement pour la lightbox
    photographerMedias = medias;
    
    await displayPhotographer(photographer);
    await displayPhotographerMedias(medias);

    displayModalPhotographName(photographer);
    displayLikesPriceInfos(photographer, medias);
}

function openMediaLightbox(mediaId) {
    const mediaIndex = photographerMedias.findIndex(media => media.id === mediaId);
    if (mediaIndex !== -1) {
        displayLightbox(photographerMedias, mediaIndex);
    }
}

async function init() {
    const photographerId = getIdFromUrl();
    const photographer = await getPhotographer(photographerId);
    
    if (photographer) {
        const medias = await getPhotographerMedias(photographerId);
        displayData(photographer, medias);
    } else {
        alert("La page n'existe pas !");
    }
}

init();
initListbox();
