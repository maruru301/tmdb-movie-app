import { fetchSearchMovies } from './api.js';
import { renderMovies } from './render.js';

export const handleSearch = async (query, cardList, cardListTitle) => {
    if (!query) {
        alert('검색어를 입력해주세요');
        return;
    }

    try {
        const movies = await fetchSearchMovies(query); // 검색 영화 데이터 가져오기

        cardListTitle.textContent = '🔎 검색 결과';
        renderMovies(movies, cardList);
    } catch (err) {
        console.error('검색 실패: ', err);
    }
};
