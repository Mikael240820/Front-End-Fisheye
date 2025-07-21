function toggleLike(button, likesCountElement, mediaTitle) {
    const mediaId = parseInt(button.getAttribute('data-media-id'));
    const icon = button.querySelector('img');
    const isLiked = button.getAttribute('aria-pressed') === 'true';
    
    let currentLikes = parseInt(likesCountElement.textContent);
    
    if (isLiked) {
        // Retirer le like
        currentLikes--;
        icon.setAttribute('src', 'assets/icons/heart.svg');
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', `Aimer ${mediaTitle}`);
    } else {
        // Ajouter le like
        currentLikes++;
        icon.setAttribute('src', 'assets/icons/heart-red.svg');
        button.setAttribute('aria-pressed', 'true');
        button.setAttribute('aria-label', `Ne plus aimer ${mediaTitle}`);
    }
    
    // Mettre à jour l'affichage local
    likesCountElement.textContent = currentLikes;
    likesCountElement.setAttribute('aria-label', `${currentLikes} likes`);
    
    // Mettre à jour le compteur global
    const mediaIndex = photographerMedias.findIndex(media => media.id === mediaId);
    if (mediaIndex !== -1) {
        photographerMedias[mediaIndex].likes = currentLikes;
    }
    
    // Mettre à jour le compteur total
    updateTotalLikes();
}

function updateTotalLikes() {
    const photographLikes = document.getElementById('photograph_likes');
    if (photographLikes) {
        const totalLikes = photographerMedias.reduce((sum, media) => sum + media.likes, 0);
        photographLikes.innerHTML = `${totalLikes} <img src="assets/icons/heart.svg" alt="">`;
    }
}
