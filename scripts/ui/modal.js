let previouslyFocusedElement = null;

function displayModal() {
    const modal = document.getElementById('contact_modal');
    const mainContent = document.getElementById('main');
    const closeBtn = document.getElementById('close_modal');

    // Mémoriser l'élément qui avait le focus
    previouslyFocusedElement = document.activeElement;

    // Afficher la modal
    document.body.classList.add('modal_open');

    // Cacher le contenu principal et montrer la modal
    mainContent.setAttribute('aria-hidden', 'true');
    mainContent.inert = true; // Désactiver tout le contenu principal
    modal.setAttribute('aria-hidden', 'false');

    // Mettre le focus sur le bouton de fermeture
    if (closeBtn) {
        closeBtn.focus();
    }

    // Ajouter l'écouteur pour la touche Escape
    document.addEventListener('keydown', handleContactModalEscapeKey);
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    const mainContent = document.getElementById('main');

    // Cacher la modal avec animation
    document.body.classList.remove('modal_open');

    // Restaurer le contenu principal et cacher la modal
    mainContent.setAttribute('aria-hidden', 'false');
    mainContent.inert = false; // Réactiver le contenu principal
    modal.setAttribute('aria-hidden', 'true');

    // Retirer l'écouteur pour la touche Escape
    document.removeEventListener('keydown', handleContactModalEscapeKey);

    // Restaurer le focus sur l'élément qui l'avait avant l'ouverture
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
    }
}

function handleContactModalEscapeKey(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        const modal = document.getElementById('contact_modal');
        // Vérifier que c'est bien la modal de contact qui est ouverte
        if (modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    }
}
