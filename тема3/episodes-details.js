function createList(items) {
    const list = document.createElement('ul');
    items.forEach(text => {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.textContent = text;
        list.append(item);
    });
    list.classList.add('list-group', 'mb-4');
    const div = document.createElement('div');
    div.append(list);
    return div;
}

export function render(data, planets, species) {
    const container = document.createElement('div');
    container.classList.add('container', 'py-4');
    const planetsList = createList(planets.map(planet => planet.result.properties.name));
    const speciesList = createList(species.map(sp => sp.result.properties.name));
    container.innerHTML = `
    <h1>${data.result.properties.title}<br>Эпизод ${data.result.uid}</h1>
    <p>${data.result.properties.opening_crawl}</p>
    <h2>Planets</h2>
    ${planetsList.innerHTML} 
    <h2>Species</h2>
    ${speciesList.innerHTML}
    <a class="btn btn-primary" href="index.html">Back to episodes</a>
    `
    return container;
}