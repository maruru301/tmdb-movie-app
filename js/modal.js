import { fetchMovieDetails } from './api.js';
import { parseMovieData } from './utils/movieParser.js';
import { renderModal } from './render.js';

// 모달 열기
export const openModal = async (movieId, modalEl) => {
    try {
        const movieData = await fetchMovieDetails(movieId); // 영화 상세 데이터 가져오기
        const parsedMovieData = parseMovieData(movieData);

        modalEl.classList.remove('hidden');
        renderModal(parsedMovieData, modalEl);
    } catch (err) {
        console.error('모달 열기 실패:', err);
    }
};

// 모달 닫기
export const closeModal = (e, modalEl) => {
    // 닫기 버튼 또는 modal 영역 클릭 시 모달창 닫기
    if (e.target === modalEl || e.target.classList.contains('modal-close')) {
        modalEl.classList.add('hidden');
    }
};
