import { fetchMovieDetails } from './api.js';
import { renderMovies } from './render.js';

// 북마크 추가/해제
export const toggleBookmark = (movieId, bookmarkBtn) => {
    let idArr = JSON.parse(localStorage.getItem('id')) || [];
    const bookmarkIcon = bookmarkBtn.querySelector('.bookmark-icon');

    if (!idArr.includes(movieId)) {
        // 북마크 추가
        idArr.push(movieId);
        bookmarkIcon.src = 'assets/icon-bookmark-filled.svg';
        bookmarkBtn.classList.add('active');
    } else {
        // 북마크 해제
        idArr = idArr.filter((id) => id !== movieId);
        bookmarkIcon.src = 'assets/icon-bookmark-empty.svg';
        bookmarkBtn.classList.remove('active');
    }

    localStorage.setItem('id', JSON.stringify(idArr));
};

// 북마크 필터링
export const filterBookmarks = async (cardList, titleEl) => {
    const idArr = JSON.parse(localStorage.getItem('id')) || [];

    if (!idArr.length) {
        alert('북마크한 영화가 없습니다!');
        return;
    }

    try {
        const bookmarkedMovies = await Promise.all(idArr.map((id) => fetchMovieDetails(id)));

        titleEl.textContent = '🔖 북마크한 영화';
        renderMovies(bookmarkedMovies, cardList);
    } catch (err) {
        console.error('북마크 필터링 실패:', err);
    }
};
