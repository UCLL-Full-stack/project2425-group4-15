// npx ts-node ./util/seed.ts to set up database with default values

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    // Delete all data before regenerating
    await prisma.review.deleteMany();
    await prisma.movie.deleteMany();
    await prisma.series.deleteMany();
    await prisma.user.deleteMany();

    // Seed users
    const user1 = await prisma.user.create({
        data: {
            username: 'Domoo',
            email: 'domooboss@gmail.com',
            password: 'ballz',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'Ruben',
            email: 'rubenboss@gmail.com',
            password: 'ligma',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            username: 'Sigma',
            email: 'sigmaboy@gmail.com',
            password: 'sigma',
        },
    });

    // Seed movies
    const movie1 = await prisma.movie.create({
        data: {
            title: 'The Matrix',
            genre: ['Action', 'Sci-Fi'],
            releaseDate: new Date('1999-03-31'),
            cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
            director: 'The Wachowskis',
            description: 'A hacker discovers the reality he knows is a simulation.',
            coverPic:
                'https://xl.movieposterdb.com/22_10/1999/365467/xl_making-the-matrix-movie-poster_5c26f67b.jpg?v=2024-11-20%2011:03:56', // Add your cover pic URL here
        },
    });

    const movie2 = await prisma.movie.create({
        data: {
            title: 'Inception',
            genre: ['Sci-Fi', 'Thriller'],
            releaseDate: new Date('2010-07-16'),
            cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
            director: 'Christopher Nolan',
            description: "A thief enters dreams to plant an idea in someone's mind.",
            coverPic:
                'https://xl.movieposterdb.com/10_06/2010/1375666/xl_1375666_07030c72.jpg?v=2024-12-16%2008:08:31', // Add your cover pic URL here
        },
    });

    const movie3 = await prisma.movie.create({
        data: {
            title: 'Star Wars: A New Hope',
            genre: ['Sci-Fi', 'Adventure'],
            releaseDate: new Date('1977-05-25'),
            cast: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher'],
            director: 'George Lucas',
            description: 'The Rebellion fights the evil Galactic Empire.',
            coverPic:
                'https://xl.movieposterdb.com/06_07/1977/0076759/xl_123404_0076759_e7bfc429.jpg?v=2024-12-16%2023:30:44', // Add your cover pic URL here
        },
    });

    const movie4 = await prisma.movie.create({
        data: {
            title: 'The Shawshank Redemption',
            genre: ['Drama'],
            releaseDate: new Date('1994-09-23'),
            cast: ['Tim Robbins', 'Morgan Freeman'],
            director: 'Frank Darabont',
            description: 'Two imprisoned men bond over years, finding solace and redemption.',
            coverPic:
                'https://xl.movieposterdb.com/05_03/1994/0111161/xl_8494_0111161_3bb8e662.jpg?v=2024-12-15%2019:36:40', // Add your cover pic URL here
        },
    });

    const movie5 = await prisma.movie.create({
        data: {
            title: 'The Dark Knight',
            genre: ['Action', 'Crime'],
            releaseDate: new Date('2008-07-18'),
            cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
            director: 'Christopher Nolan',
            description: 'Batman faces the Joker, who seeks to plunge Gotham into chaos.',
            coverPic:
                'https://xl.movieposterdb.com/08_06/2008/468569/xl_468569_fe24b125.jpg?v=2024-12-17%2021:24:49', // Add your cover pic URL here
        },
    });

    // Seed series
    const series1 = await prisma.series.create({
        data: {
            title: 'Breaking Bad',
            genre: ['Crime', 'Drama', 'Thriller'],
            releaseDate: new Date('2008-01-20'),
            cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
            director: 'Vince Gilligan',
            seasons: 5,
            description: 'A chemistry teacher turns to meth production to support his family.',
            coverPic:
                'https://xl.movieposterdb.com/08_04/2008/903747/xl_903747_a1327335.jpg?v=2024-06-01%2005:59:44', // Add your cover pic URL here
        },
    });

    const series2 = await prisma.series.create({
        data: {
            title: 'Game of Thrones',
            genre: ['Fantasy', 'Drama', 'Adventure'],
            releaseDate: new Date('2011-04-17'),
            cast: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage'],
            director: 'David Benioff & D.B. Weiss',
            seasons: 8,
            description: 'Noble families fight for control of the Iron Throne.',
            coverPic:
                'https://xl.movieposterdb.com/11_03/2011/944947/xl_944947_390180e8.jpg?v=2024-10-31%2018:12:51', // Add your cover pic URL here
        },
    });

    const series3 = await prisma.series.create({
        data: {
            title: 'Stranger Things',
            genre: ['Sci-Fi', 'Horror', 'Mystery'],
            releaseDate: new Date('2016-07-15'),
            cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
            director: 'The Duffer Brothers',
            seasons: 4,
            description: 'A group of kids uncover supernatural secrets in their small town.',
            coverPic:
                'https://xl.movieposterdb.com/22_12/2016/4574334/xl_stranger-things-movie-poster_5e41833a.jpg?v=2024-11-27%2015:43:17', // Add your cover pic URL here
        },
    });

    const series4 = await prisma.series.create({
        data: {
            title: 'The Witcher',
            genre: ['Fantasy', 'Adventure', 'Action'],
            releaseDate: new Date('2019-12-20'),
            cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'],
            director: 'Lauren Schmidt Hissrich',
            seasons: 3,
            description: 'Geralt of Rivia, a monster hunter, battles dark forces.',
            coverPic:
                'https://xl.movieposterdb.com/20_12/2019/5180504/xl_5180504_a3ab3191.jpg?v=2024-10-29%2009:51:46', // Add your cover pic URL here
        },
    });

    const series5 = await prisma.series.create({
        data: {
            title: 'The Mandalorian',
            genre: ['Sci-Fi', 'Adventure'],
            releaseDate: new Date('2019-11-12'),
            cast: ['Pedro Pascal', 'Gina Carano', 'Carl Weathers'],
            director: 'Jon Favreau',
            seasons: 3,
            description: 'A lone Mandalorian bounty hunter navigates the Star Wars galaxy.',
            coverPic:
                'https://xl.movieposterdb.com/23_01/2019/8111088/xl_the-mandalorian-movie-poster_7f3ed940.jpg?v=2024-12-14%2011:21:18', // Add your cover pic URL here
        },
    });

    console.log('Seeding completed!');
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
