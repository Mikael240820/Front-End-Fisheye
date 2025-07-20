/**
 * Factory Method pour créer un élément média
 * 
 * @param {Object} mediaData - Les données du média
 * @param {number} mediaData.photographerId - ID du photographe
 * @param {string} mediaData.title - Titre du média
 * @param {string} [mediaData.image] - Nom du fichier image
 * @param {string} [mediaData.video] - Nom du fichier vidéo
 * @param {Object} [options] - Options supplémentaires
 * @param {boolean} [options.autoplay] - Autoplay pour les vidéos (lightbox)
 * @returns {HTMLElement} L'élément DOM créé (img ou video)
 */
function createMediaElement(mediaData, options = {}) {
    const { photographerId, title, image, video } = mediaData;
    
    if (image) {
        return createImageElement(photographerId, image, title, options);
    } else if (video) {
        return createVideoElement(photographerId, video, title, options);
    } else {
        throw new Error('Type de média non supporté');
    }
}

/**
 * Créer un élément image
 */
function createImageElement(photographerId, imageName, title, options = {}) {
    const img = document.createElement('img');
    img.setAttribute('src', `assets/medias/${photographerId}/${imageName}`);
    img.setAttribute('alt', title);
    img.setAttribute('role', 'img');
    
    // Options spéciales pour la lightbox
    if (options.isLightbox) {
        img.setAttribute('loading', 'lazy');
    }

    return img;
}

/**
 * Créer un élément vidéo
 */
function createVideoElement(photographerId, videoName, title, options = {}) {
    const video = document.createElement('video');
    video.setAttribute('controls', '');
    video.setAttribute('aria-label', `Voir la vidéo ${title}`);
    
    // Options spéciales pour la lightbox
    if (options.isLightbox) {
        video.setAttribute('autoplay', '');
    }
    
    const source = document.createElement('source');
    source.setAttribute('src', `assets/medias/${photographerId}/${videoName}`);
    source.setAttribute('type', 'video/mp4');
    video.appendChild(source);
    
    return video;
}
