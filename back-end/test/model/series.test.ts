import { Series } from '../../model/series';

test('given: valid values for series fields; when: Series is created; then: fields are set correctly and series is created', () => {
    const series = new Series({
        id: 1,
        title: 'Breaking Bad',
        genre: ['Crime', 'Drama'],
        releaseDate: new Date('2008-01-20'),
        cast: ['Bryan Cranston', 'Aaron Paul'],
        director: 'Vince Gilligan',
        seasons: 5,
        reviews: [],
    });

    expect(series.getId()).toEqual(1);
    expect(series.getTitle()).toEqual('Breaking Bad');
    expect(series.getGenre()).toEqual(['Crime', 'Drama']);
    expect(series.getReleaseDate()).toEqual(new Date('2008-01-20'));
    expect(series.getCast()).toEqual(['Bryan Cranston', 'Aaron Paul']);
    expect(series.getDirector()).toEqual('Vince Gilligan');
    expect(series.getSeasons()).toEqual(5);
    expect(series.getReviews()).toEqual([]);
});
