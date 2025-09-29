import config from './apikey.js';

const moviePosters = document.querySelectorAll('.movie-poster');
const movieTitles = document.querySelectorAll('.movie-title');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
    },
};

const getTopRatedMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko&page=${page}`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        data.results.forEach((movie, idx) => {
            if (movieTitles[idx]) movieTitles[idx].textContent = movie.title;
            if (moviePosters[idx]) {
                moviePosters[idx].src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
                moviePosters[idx].alt = movie.title;
            }
        });
    } catch (err) {
        console.error(err);
    }
};

getTopRatedMovies(1);
