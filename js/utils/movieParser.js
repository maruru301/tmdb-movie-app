// movie details 데이터 변환
export const parseMovieData = (data) => ({
    posterPath: data.poster_path,
    title: data.title,
    originalTitle: data.original_title,
    genres: data.genres?.map((g) => g.name) ?? [],
    overview: data.overview,
    releaseDate: data.release_date,
    runtime: data.runtime,
    voteAverage: data.vote_average.toFixed(1), // 소수점 1자리
    director: data.credits.crew.find((p) => p.job === 'Director')?.name ?? '정보 없음',
    originalDirector: data.credits.crew.find((p) => p.job === 'Director')?.original_name ?? '정보 없음',
});
