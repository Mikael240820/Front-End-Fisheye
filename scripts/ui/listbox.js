function initListbox() {
    const trigger = document.getElementById('listbox_trigger');
    const listbox = document.getElementById('listbox_options');
    const options = listbox.querySelectorAll('li[role="option"]');
    
    // Ouvrir/fermer la listbox
    trigger.addEventListener('click', () => {        
        if (trigger.getAttribute('aria-expanded') === 'true') {
            trigger.setAttribute('aria-expanded', 'false');
            listbox.style.display = 'none';
            trigger.blur();
        } else {
            trigger.setAttribute('aria-expanded', 'true');
            listbox.style.display = 'block';
        }
    });
    
    // Gérer le clic sur les options
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Désélectionner toutes les options
            options.forEach(opt => opt.setAttribute('aria-selected', 'false'));
            
            // Sélectionner l'option cliquée
            option.setAttribute('aria-selected', 'true');
            trigger.textContent = option.textContent;
            listbox.setAttribute('aria-activedescendant', option.id);
            
            // Fermer la listbox
            trigger.setAttribute('aria-expanded', 'false');
            listbox.style.display = 'none';
            trigger.blur();
            
            // Logique de tri
            const selectedValue = option.dataset.value;
            console.log(selectedValue);
        });
    });

    // Fermer si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!trigger.contains(e.target) && !listbox.contains(e.target)) {
            trigger.setAttribute('aria-expanded', 'false');
            listbox.style.display = 'none';
        }
    });
}
