import { closeModal, openModal } from './modal.js';
import { filterBookmarks, toggleBookmark } from './bookmark.js';

import { fetchTopRatedMovies } from './api.js';
import { handleSearch } from './search.js';
import { renderMovies } from './render.js';

const cardList = document.querySelector('.card-list');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const modal = document.querySelector('.modal');
const bookmarkFilterBtn = document.querySelector('.bookmark-filter-btn');
const cardListTitle = document.querySelector('.card-list-title');
const DEFAULT_PAGE = 1;

// 헤더 높이만큼 body를 아래로 밀어줌
const header = document.querySelector('header');
document.body.style.paddingTop = `${header.offsetHeight}px`;

const init = async () => {
    try {
        const movies = await fetchTopRatedMovies(DEFAULT_PAGE);
        renderMovies(movies, cardList);
    } catch (err) {
        console.error('영화 로딩 실패: ', err);
    }
};

// 검색 버튼 클릭
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    handleSearch(query, cardList, cardListTitle);
});

// 검색창에서 Enter 입력 시 검색
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// 카드 리스트 클릭 (북마크 + 모달)
cardList.addEventListener('click', (e) => {
    const movieCard = e.target.closest('.movie-card'); // 이벤트 위임
    if (!movieCard) return;

    const movieId = String(movieCard.dataset.id);

    // 북마크
    const bookmarkBtn = e.target.closest('.bookmark-btn');
    if (bookmarkBtn) {
        toggleBookmark(movieId, bookmarkBtn);
        return; // 모달 띄우지 않고 종료
    }

    // 모달 열기
    openModal(movieId, modal);
});

// 모달 닫기
modal.addEventListener('click', (e) => {
    closeModal(e, modal);
});

// 북마크 필터링
bookmarkFilterBtn.addEventListener('click', () => {
    filterBookmarks(cardList, cardListTitle);
});

init();
