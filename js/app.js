import config from './apikey.js';

const DEFAULT_PAGE = 1;
const cardList = document.querySelector('.card-list');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
    },
};

// Top Rated Movie List 가져오기
const getTopRatedMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en&page=${page}`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        renderMovies(data.results);
    } catch (err) {
        console.error(err);
    }
};

// movie card 렌더링
const renderMovies = (data) => {
    // 모든 카드 HTML 문자열 생성
    const movieCardsHTML = data
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

    cardList.innerHTML = movieCardsHTML;
};

getTopRatedMovies(DEFAULT_PAGE);

// search
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

// Search API 호출 함수
const fetchSearchMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error(err);
    }
};

// search btn 클릭 이벤트
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();

    if (query === '') {
        alert('검색어를 입력해주세요');
        return;
    }

    const movies = await fetchSearchMovies(query); // 검색 영화 데이터 가져오기

    renderMovies(movies);
});

// 검색창에서 Enter 입력 시 검색
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});
