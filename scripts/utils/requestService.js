function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        console.error('Aucun identifiant n\'a été trouvé dans l\'URL');
        return;
    }

    return id;
}
