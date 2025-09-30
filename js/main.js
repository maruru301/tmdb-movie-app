import { fetchMovieDetails, fetchSearchMovies, fetchTopRatedMovies } from './api.js';
import { renderModal, renderMovies } from './render.js';

import { parseMovieData } from './utils/movieParser.js';

const cardList = document.querySelector('.card-list');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const modal = document.querySelector('.modal');
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

// 모달 창
cardList.addEventListener('click', async (e) => {
    const movieCard = e.target.closest('.movie-card'); // 이벤트 위임
    if (!movieCard) return;

    const movieId = movieCard.dataset.id;

    const movieData = await fetchMovieDetails(movieId); // 영화 상세 데이터 가져오기
    const parsedMovieData = parseMovieData(movieData);

    modal.classList.remove('hidden');

    console.log(`${parsedMovieData.posterPath}`);

    renderModal(parsedMovieData, modal);
});

// 닫기 버튼 또는 modal 영역 클릭 시 모달창 닫기
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-close')) {
        modal.classList.add('hidden');
    }
});

init();
