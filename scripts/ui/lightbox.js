let currentMediaList = [];
let currentMediaIndex = 0;
let previouslyFocusedElementLightbox = null;

function displayLightbox(mediaList, startIndex = 0) {
    const lightbox = document.getElementById('media_lightbox');
    const mainContent = document.getElementById('main');

    // Mémoriser l'élément qui avait le focus
    previouslyFocusedElementLightbox = document.activeElement;

    // Stocker les données
    currentMediaList = mediaList;
    currentMediaIndex = startIndex;

    // Afficher la lightbox
    document.body.classList.add('modal_open');

    // Cacher le contenu principal et montrer la lightbox
    mainContent.setAttribute('aria-hidden', 'true');
    mainContent.inert = true; // Désactiver tout le contenu principal
    lightbox.setAttribute('aria-hidden', 'false');

    // Afficher le média actuel
    showCurrentMedia();

    // Mettre le focus sur le container de la lightbox
    const container = document.getElementById('lightbox_container');
    container.focus();

    // Ajouter les écouteurs pour la navigation
    document.addEventListener('keydown', handleLightboxKeydown);
}

function closeLightbox() {
    const lightbox = document.getElementById('media_lightbox');
    const mainContent = document.getElementById('main');

    // Cacher la lightbox
    document.body.classList.remove('modal_open');

    // Restaurer le contenu principal et cacher la lightbox
    mainContent.setAttribute('aria-hidden', 'false');
    mainContent.inert = false; // Réactiver le contenu principal
    lightbox.setAttribute('aria-hidden', 'true');

    // Retirer les écouteurs pour la navigation
    document.removeEventListener('keydown', handleLightboxKeydown);

    // Restaurer le focus sur l'élément qui l'avait avant l'ouverture
    if (previouslyFocusedElementLightbox) {
        previouslyFocusedElementLightbox.focus();
        previouslyFocusedElementLightbox = null;
    }

    // Nettoyer les données
    currentMediaList = [];
    currentMediaIndex = 0;
}

function handleLightboxKeydown(event) {
    const lightbox = document.getElementById('media_lightbox');

    // Vérifier que la lightbox est bien ouverte
    if (lightbox.getAttribute('aria-hidden') === 'true') {
        return;
    }

    switch (event.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            previousMedia();
            break;
        case 'ArrowRight':
            event.preventDefault();
            nextMedia();
            break;
    }
}

function previousMedia() {
    if (currentMediaList.length === 0) return;

    currentMediaIndex = currentMediaIndex === 0
        ? currentMediaList.length - 1
        : currentMediaIndex - 1;

    showCurrentMedia();
}

function nextMedia() {
    if (currentMediaList.length === 0) return;

    currentMediaIndex = (currentMediaIndex + 1) % currentMediaList.length;
    showCurrentMedia();
}

function showCurrentMedia() {
    const mediaContent = document.getElementById('lightbox_content');
    const title = document.getElementById('lightbox_title');
    const prevBtn = document.querySelector('.lightbox_prev');
    const nextBtn = document.querySelector('.lightbox_next');

    if (!mediaContent || currentMediaList.length === 0) return;

    const media = currentMediaList[currentMediaIndex];
    if (!media) return;

    // Mettre à jour le titre
    if (title) {
        title.textContent = media.title;
    }

    // Vider le contenu précédent
    mediaContent.innerHTML = '';

    // Créer le container du média
    const lightboxMedia = document.createElement('div');
    lightboxMedia.classList.add('lightbox_media');

    // Utiliser la Factory pour créer l'élément média
    try {
        const mediaElement = createMediaElement(media, { isLightbox: true, hasControls: true });
        lightboxMedia.appendChild(mediaElement);
    } catch (error) {
        console.error('Erreur lors de la création du média dans la lightbox');
        return;
    }

    // Créer le titre du média
    const mediaTitle = document.createElement('p');
    mediaTitle.classList.add('lightbox_media_title');
    mediaTitle.textContent = media.title;
    lightboxMedia.appendChild(mediaTitle);

    // Ajouter le média au container
    mediaContent.appendChild(lightboxMedia);

    // Montrer/cacher les boutons selon le nombre de médias
    if (currentMediaList.length > 1) {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
    } else {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
}
