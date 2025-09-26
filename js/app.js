import config from './apikey.js';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
    },
};

const getTopRatedMovies = async ({ page }) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko&page=${page}`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        data.results.forEach((movie) => {
            console.log(`\nTitle: ${movie.title} (${movie.original_title}) · ${movie.release_date}`);
            console.log(`Overview: ${movie.overview}`);
        });
    } catch (err) {
        console.error(err);
    }
};

getTopRatedMovies(1);
