// movie details 데이터 변환
export const parseMovieData = (data) => ({
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
