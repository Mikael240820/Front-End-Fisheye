async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM({titleTag: 'h2'});
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
