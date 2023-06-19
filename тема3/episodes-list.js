export function render(data) {
    const container = document.createElement('div');
    container.classList.add('container', 'py-4');
    for (const episode of data.result) {
        const episodeCard = document.createElement('div');
        const cardBody = document.createElement('div');
        const title = document.createElement('h4');
        const subtitle = document.createElement('h5');
        const detailsButton = document.createElement('a');

        episodeCard.classList.add('card', 'my-2');
        cardBody.classList.add('card-body');
        title.classList.add('card-title');
        subtitle.classList.add('card-title');
        detailsButton.classList.add('btn', 'btn-primary');

        episodeCard.append(cardBody);
        cardBody.append(title);
        cardBody.append(subtitle);
        cardBody.append(detailsButton);

        title.textContent = episode.properties.title;
        subtitle.textContent =`Эпизод ${episode.uid}`;
        detailsButton.textContent = 'Подробнее';
        detailsButton.href = `?episode=${episode.uid}`;

        container.append(episodeCard);
    }

    return container;
}