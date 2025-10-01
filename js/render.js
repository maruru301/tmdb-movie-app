// movie card 렌더링
export const renderMovies = (data, container) => {
    let idArr = JSON.parse(localStorage.getItem('id')) || [];

    // 검색 결과가 없는 경우
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div>
                검색 결과가 없습니다.
            </div>
        `;
        return;
    }

    // 모든 카드 HTML 문자열 생성
    const movieCardsHTML = data
        .map((movie) => {
            const posterPath = movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : 'https://placehold.co/200x300?text=No+Image&bg=cccccc&fg=555555';
            const isBookmarked = idArr.includes(String(movie.id));

            return `
            <div class="movie-card" data-id="${movie.id}">
                <img class="movie-poster" src="${posterPath}" alt="${movie.title}" />
                <div class="movie-title">${movie.title}</div>
                <button class="bookmark-btn ${isBookmarked ? 'active' : ''}">
                    <img class="bookmark-icon" src="assets/${
                        isBookmarked ? 'icon-bookmark-filled.svg' : 'icon-bookmark-empty.svg'
                    }"  />
                </button>
            </div>
        `;
        })
        .join(''); // 배열 → 문자열 합치기

    container.innerHTML = movieCardsHTML;
};

// modal 렌더링
export const renderModal = (movie, container) => {
    const posterPath = movie.posterPath
        ? `https://image.tmdb.org/t/p/w200${movie.posterPath}`
        : 'https://placehold.co/200x300?text=No+Image&bg=cccccc&fg=555555';

    container.innerHTML = `
            <div class="modal-box">
                <div class="modal-content">
                    <img class="modal-poster" src="${posterPath}" alt="${movie.title}" />
                    <div class="modal-info">
                        <h3 class="modal-title">${movie.title} (${movie.originalTitle})</h3>
                        <div class="modal-meta">
                            <span>📅 ${movie.releaseDate}</span>
                            <span>⭐ ${movie.voteAverage}</span>
                            <span>🕔 ${movie.runtime}분</span>
                            <span>| ${movie.genres}</span>
                        </div>
                        <div class="modal-director">감독: ${
                            movie.director === movie.originalDirector
                                ? movie.director
                                : `${movie.director} (${movie.originalDirector})`
                        }</div>
                        <p class="modal-overview">${movie.overview}</p>
                    </div>
                </div>
                <button class="modal-close">x</button>
            </div>
            `;
};
