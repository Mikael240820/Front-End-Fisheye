function mediaTemplate(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    
    function getMediaCardDOM() {
        const figure = document.createElement('figure');
        
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('role', 'button');
        
        if (image) {
            a.setAttribute('aria-label', `Voir l'image ${title} en grand`);
        } else if (video) {
            a.setAttribute('aria-label', `Voir la vidéo ${title} en grand`);
        }
        
        // Ajouter un listener pour ouvrir la lightbox
        a.addEventListener('click', (e) => {
            e.preventDefault();
            openMediaLightbox(id);
        });
        
        // Utilisation du Factory Method
        try {
            const mediaElement = createMediaElement(data);
            a.appendChild(mediaElement);
        } catch (error) {
            console.error('Erreur lors de la création du média');
            return figure;
        }
        
        figure.appendChild(a);
        
        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('photographer_info');
        
        const description = document.createElement('p');
        description.textContent = title;
        description.setAttribute('id', `media-title-${id}`);
        figcaption.appendChild(description);
        
        const likesContainer = document.createElement('div');
        likesContainer.classList.add('photographer_likes');
        
        const likesCount = document.createElement('span');
        likesCount.textContent = likes;
        likesCount.setAttribute('aria-label', `${likes} likes`);

        const icon = document.createElement('img');
        icon.setAttribute('src', 'assets/icons/heart-red.svg');
        icon.setAttribute('alt', 'likes');
 
        const likeButton = document.createElement('button');
        likeButton.setAttribute('type', 'button');
        likeButton.appendChild(icon);
        
        likesContainer.appendChild(likesCount);
        likesContainer.appendChild(likeButton);
        figcaption.appendChild(likesContainer);
        
        figure.appendChild(figcaption);
        
        return figure;
    }
    
    return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM };
}
