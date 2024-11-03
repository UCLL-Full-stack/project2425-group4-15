import { Movie } from '../../model/movie';

test('given: valid values for movie fields; when: Movie is created; then: fields are set correctly and movie is created.', () => {
    const movie = new Movie({
        id: 1,
        title: 'Inception',
        genre: ['Sci-Fi', 'Action'],
        releaseDate: new Date('2010-07-16'),
        cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
        director: 'Christopher Nolan',
        reviews: [],
    });

    expect(movie.getId()).toEqual(1);
    expect(movie.getTitle()).toEqual('Inception');
    expect(movie.getGenre()).toEqual(['Sci-Fi', 'Action']);
    expect(movie.getReleaseDate()).toEqual(new Date('2010-07-16'));
    expect(movie.getCast()).toEqual(['Leonardo DiCaprio', 'Joseph Gordon-Levitt']);
    expect(movie.getDirector()).toEqual('Christopher Nolan');
    expect(movie.getReviews()).toEqual([]);
});
