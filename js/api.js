import config from './apikey.js';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
    },
};

// Top Rated Movie List
export const getTopRatedMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en&page=${page}`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error('Top Rated Movies API Error: ', err);
    }
};

// Search Movie
export const fetchSearchMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error('Search Movies API Error: ', err);
    }
};
