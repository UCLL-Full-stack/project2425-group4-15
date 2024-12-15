//npx ts-node ./util/seed.ts to set up database with default values


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    //delete all default value before regenerating
    await prisma.user.deleteMany();

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
