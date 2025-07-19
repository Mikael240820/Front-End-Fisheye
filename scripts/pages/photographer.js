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
    await displayPhotographer(photographer);
    await displayPhotographerMedias(medias);
}

function initListbox() {
    const trigger = document.getElementById('filter_trigger');
    const listbox = document.getElementById('filter_options');
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

function displayInfos(photographer) {
    const modalPhotographName = document.getElementById('modal_photograph_name');
    modalPhotographName.innerText = photographer.name;
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
