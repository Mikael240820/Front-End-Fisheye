function displayModal() {
    const modal = document.getElementById('contact_modal');
    const mainContent = document.getElementById('main');
    const closeBtn = document.getElementById('close_modal');
    
    // Afficher la modal
    document.body.classList.add('modal_open');
    
    // Cacher le contenu principal et montrer la modal
    mainContent.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
    
    // Mettre le focus sur le bouton de fermeture
    if (closeBtn) {
        closeBtn.focus();
    }
    
    // Ajouter l'écouteur pour la touche Escape
    document.addEventListener('keydown', handleEscapeKey);
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    const mainContent = document.getElementById('main');

    // Cacher la modal avec animation
    document.body.classList.remove('modal_open');
    
    // Restaurer le contenu principal et cacher la modal
    mainContent.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
    
    // Retirer l'écouteur pour la touche Escape
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        const modal = document.getElementById('contact_modal');
        if (modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    }
}

function showFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    input.classList.add('is_invalid');
}

function hideFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    input.classList.remove('is_invalid');
}

function sendForm(event) {
    event.preventDefault();
    
    const form = event.target;
    let hasErrors = false;
    
    // Réinitialiser les erreurs
    hideFieldError('input_firstname');
    hideFieldError('input_lastname');
    hideFieldError('input_email');
    hideFieldError('input_message');
    
    if (!form.firstname.value) {
        showFieldError('input_firstname');
        hasErrors = true;
    }
    
    if (!form.lastname.value) {
        showFieldError('input_lastname');
        hasErrors = true;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.value || !emailRegex.test(form.email.value)) {
        showFieldError('input_email');
        hasErrors = true;
    }
    
    if (!form.message.value) {
        showFieldError('input_message');
        hasErrors = true;
    }
    
    if (!hasErrors) {
        // Console.log des valeurs
        console.log('Données du formulaire:', {
            prénom: form.firstname.value,
            nom: form.lastname.value,
            email: form.email.value,
            message: form.message.value
        });
        
        alert('Votre message a été envoyé avec succès !');
        form.reset();
        closeModal();
    }
}
