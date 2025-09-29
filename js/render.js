// movie card 렌더링
export const renderMovies = (data, container) => {
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

    container.innerHTML = movieCardsHTML;
};
