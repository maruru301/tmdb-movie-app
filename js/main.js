import { fetchMovieDetails, fetchSearchMovies, fetchTopRatedMovies } from './api.js';

import { renderMovies } from './render.js';

const cardList = document.querySelector('.card-list');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const DEFAULT_PAGE = 1;

const init = async () => {
    try {
        const movies = await fetchTopRatedMovies(DEFAULT_PAGE);
        renderMovies(movies, cardList);
    } catch (err) {
        console.error('영화 로딩 실패:', err);
    }
};

// search btn 클릭 이벤트
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();

    if (!query) {
        alert('검색어를 입력해주세요');
        return;
    }

    const movies = await fetchSearchMovies(query); // 검색 영화 데이터 가져오기

    renderMovies(movies, cardList);
});

// 검색창에서 Enter 입력 시 검색
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// movie details 데이터 변환
const parseMovieData = (data) => ({
    backdropPath: data.backdrop_path,
    title: data.title,
    originalTitle: data.original_title,
    genres: data.genres?.map((g) => g.name) ?? [],
    overview: data.overview,
    releaseDate: data.release_date,
    runtime: data.runtime,
    voteAverage: data.vote_average,
    director: data.credits.crew.find((p) => p.job === 'Director')?.name ?? '정보 없음',
});

// 모달 창
cardList.addEventListener('click', async (e) => {
    const movieCard = e.target.closest('.movie-card'); // 이벤트 위임
    if (!movieCard) return;

    const movieId = movieCard.dataset.id;
    console.log('영화 id: ', movieId);

    const movieData = await fetchMovieDetails(movieId); // 영화 상세 데이터 가져오기
    const parsedMovieData = parseMovieData(movieData);

    console.log(parsedMovieData);
});

init();
