import config from './apikey.js';

const moviePosters = document.querySelectorAll('.movie-poster');
const movieTitles = document.querySelectorAll('.movie-title');
const cardList = document.querySelector('.card-list');

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

        // 모든 카드 HTML 문자열 생성
        const movieCardsHTML = data.results
            .map((movie) => {
                const posterPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
                return `
                <div class="movie-card">
                    <img class="movie-poster" src="${posterPath}" alt="${movie.title}" />
                    <div class="movie-title">${movie.title}</div>
                </div>
            `;
            })
            .join(''); // 배열 → 문자열 합치기

        // 한 번만 할당
        cardList.innerHTML = movieCardsHTML;
    } catch (err) {
        console.error(err);
    }
};

getTopRatedMovies(1);
