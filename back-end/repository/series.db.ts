import database from '../util/database';
import { Series } from '../model/series';
import { de } from 'date-fns/locale';

const getAllSeries = async (): Promise<Series[]> => {
    try {
        const series = await database.series.findMany({
            include: {
                reviews: {
                    include: { user: true }, // Include reviews and their users
                },
            },
        });
        return series.map((serie) => Series.from(serie));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const getSeriesByTitle = async ({ title }: { title: string }): Promise<Series | null> => {
    try {
        const serie = await database.series.findFirst({
            where: { title },
            include: {
                reviews: {
                    include: { user: true },
                },
            },
        });
        return serie ? Series.from(serie) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const createSeries = async (series: Series): Promise<Series> => {
    try {
        const seriesPrisma = await database.series.create({
            data: {
                title: series.getTitle(),
                genre: series.getGenre(),
                releaseDate: series.getReleaseDate(),
                cast: series.getCast(),
                director: series.getDirector(),
                seasons: series.getSeasons(),
                coverPic: series.getCoverPic(),
                description: series.getDescription(),
                reviews: {
                    connect: series.getReviews().map((review) => ({ id: review.getId() })),
                },
            },
            include: {
                reviews: {
                    include: { user: true },
                },
            },
        });
        return Series.from(seriesPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

const deleteSeries = async (id: number): Promise<void> => {
    try {
        await database.series.delete({ where: { id } });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details.');
    }
};

export default {
    getAllSeries,
    getSeriesByTitle,
    createSeries,
    deleteSeries,
};
