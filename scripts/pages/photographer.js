// Variable globale pour stocker tous les médias du photographe
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

async function displayData(photographer, medias) {
    // Stocker les médias globalement pour la lightbox
    photographerMedias = medias;
    
    await displayPhotographer(photographer);
    await displayPhotographerMedias(medias);
}

function displayInfos(photographer) {
    const modalPhotographName = document.getElementById('modal_photograph_name');
    modalPhotographName.innerText = photographer.name;
}

// Fonction pour ouvrir la lightbox avec le média sélectionné
function openMediaLightbox(mediaId) {
    // Trouver l'index du média dans la liste
    const mediaIndex = photographerMedias.findIndex(media => media.id === mediaId);
    
    if (mediaIndex !== -1) {
        // Ouvrir la lightbox avec tous les médias et commencer par celui sélectionné
        displayLightbox(photographerMedias, mediaIndex);
    }
}

async function init() {
    const photographerId = getIdFromUrl();
    const photographer = await getPhotographer(photographerId);
    
    if (photographer) {
        const medias = await getPhotographerMedias(photographerId);
        displayData(photographer, medias);
        displayInfos(photographer);
    } else {
        alert("La page n'existe pas !");
    }
}

init();
initListbox();
