async function displayPhotographer(photographer) {
    const photographerHeader = document.querySelector('.photograph_header');
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographerHeader.appendChild(userCardDOM);
}

async function init() {
    const photographerId = getIdFromUrl();
    const photographer = await getPhotographer(photographerId);
    
    if (photographer) {
        await displayPhotographer(photographer);
    } else {
        alert("La page n'existe pas !");
    }
}

init();
