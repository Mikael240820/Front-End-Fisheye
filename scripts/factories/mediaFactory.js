/**
 * Factory Method pour créer un élément média
 * 
 * @param {Object} mediaData - Les données du média
 * @param {number} mediaData.photographerId - ID du photographe
 * @param {string} mediaData.title - Titre du média
 * @param {string} [mediaData.image] - Nom du fichier image
 * @param {string} [mediaData.video] - Nom du fichier vidéo
 * @returns {HTMLElement} L'élément DOM créé (img ou video)
 */
function createMediaElement(mediaData) {
    const { photographerId, title, image, video } = mediaData;
    
    if (image) {
        return createImageElement(photographerId, image, title);
    } else if (video) {
        return createVideoElement(photographerId, video, title);
    } else {
        throw new Error('Type de média non supporté');
    }
}

/**
 * Créer un élément image
 */
function createImageElement(photographerId, imageName, title) {
    const img = document.createElement('img');
    img.setAttribute('src', `assets/medias/${photographerId}/${imageName}`);
    img.setAttribute('alt', title);
    img.setAttribute('role', 'img');

    return img;
}

/**
 * Créer un élément vidéo
 */
function createVideoElement(photographerId, videoName, title) {
    const video = document.createElement('video');
    video.setAttribute('controls', '');
    video.setAttribute('aria-label', `Voir la vidéo ${title}`);
    
    const source = document.createElement('source');
    source.setAttribute('src', `assets/medias/${photographerId}/${videoName}`);
    source.setAttribute('type', 'video/mp4');
    video.appendChild(source);
    
    return video;
}
