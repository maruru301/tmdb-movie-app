import config from './apikey.js';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
    },
};

// Top Rated Movie List
export const fetchTopRatedMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko&page=${page}`;

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
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ko`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error('Search Movies API Error: ', err);
    }
};

// Movie Details
export const fetchMovieDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=ko`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data; // 단일 영화 객체
    } catch (err) {
        console.error('Movie Detail API Error: ', err);
    }
};
