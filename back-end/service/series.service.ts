import seriesDB from '../repository/series.db';
import { Series } from '../model/series';
import { SeriesInput } from '../types';
import { release } from 'os';

const getAllSeries = async (): Promise<Series[]> => {
    return await seriesDB.getAllSeries();
};

const createSeries = async ({
    title,
    genre,
    releaseDate,
    cast,
    director,
    seasons,
    coverPic,
    description,
}: SeriesInput): Promise<Series> => {
    const exitsingSeries = await seriesDB.getSeriesByTitle({ title });
    if (exitsingSeries) {
        throw new Error(`Series already exists with this title: ${title}.`);
    }

    const series = new Series({
        title,
        genre,
        releaseDate: new Date(releaseDate),
        cast,
        director,
        seasons,
        coverPic,
        description,
        reviews: [],
    });
    return await seriesDB.createSeries(series);
};

const deleteSeries = async (id: number): Promise<void> => {
    if (!id) {
        throw new Error('Series ID is required for deletion.');
    }
    return await seriesDB.deleteSeries(id);
};

export default {
    getAllSeries,
    createSeries,
    deleteSeries,
};
