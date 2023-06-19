const cssPromises = [];

export function loadResource(src) {
    if (src.endsWith('.js')) {
        return import(src);
    }

    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromises[src] = new Promise(resolve => link.addEventListener('load', () => resolve()));
            document.head.append(link);
        }
        return cssPromises[src];
    }

    return fetch(src).then(res => res.json());
}

const episodesContainer = document.getElementById('episodes');
const searchParams = new URLSearchParams(location.search);

const episodeId = searchParams.get('episode');

function renderPage(moduleName, apiUrl, css) {
    Promise.all([moduleName, apiUrl, css].map(src => loadResource(src))).then(([pageModule, data]) => {
        episodesContainer.innerHTML = '';
        episodesContainer.append(pageModule.render(data))
    });
}

function renderDetailsPage(moduleName, apiUrl, css, planets, species) {
    Promise.all([moduleName, apiUrl, css].map(src => loadResource(src))).then(([pageModule, data]) => {
        episodesContainer.innerHTML = '';
        Promise.all(
            [Promise.all(data.result.properties.planets.map(src => loadResource(src))),
            Promise.all(data.result.properties.species.map(src => loadResource(src)))]
        ).then(([planets, species]) => episodesContainer.append(pageModule.render(data, planets, species)))
    });
}

if (episodeId) {
    renderDetailsPage(
        './episodes-details.js',
        `https://www.swapi.tech/api/films/${episodeId}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
    )
}
else {
    renderPage(
        './episodes-list.js',
        'https://www.swapi.tech/api/films',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
    )
}