async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json');
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Problème avec le chargement des données');
        return { photographers: [], media: [] };
    }
}

async function getPhotographer(id) {
    const data = await getPhotographers();
    const photographer = data.photographers.find(p => p.id === parseInt(id));
    
    if (!photographer) {
        console.error("Le photographe n'a pas été trouvé");
        return {};
    }
    
    return photographer;
}

async function getPhotographerMedias(photographerId) {
    const data = await getPhotographers();
    return data.media.filter(m => m.photographerId === parseInt(photographerId));
}
