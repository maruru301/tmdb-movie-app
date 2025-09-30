// movie card 렌더링
export const renderMovies = (data, container) => {
    // 모든 카드 HTML 문자열 생성
    const movieCardsHTML = data
        .map((movie) => {
            const posterPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

            return `
            <div class="movie-card" data-id="${movie.id}">
                <img class="movie-poster" src="${posterPath}" alt="${movie.title}" />
                <div class="movie-title">${movie.title}</div>
                <button class="bookmark-btn">
                    <img class="bookmark-icon" src="assets/icon-bookmark-empty.svg" />
                </button>
            </div>
        `;
        })
        .join(''); // 배열 → 문자열 합치기

    container.innerHTML = movieCardsHTML;
};

// modal 렌더링
export const renderModal = (movie, container) => {
    const posterPath = `https://image.tmdb.org/t/p/w200${movie.posterPath}`;

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
