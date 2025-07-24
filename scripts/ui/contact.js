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
