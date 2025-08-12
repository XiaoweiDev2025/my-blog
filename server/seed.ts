import 'dotenv/config';
import { PrismaClient } from './server/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
    const author = await prisma.user.upsert({
        where: { email: 'seed@example.com' },
        update: {},
        create: {
            email: 'seed@example.com',
            password: 'hashed-demo',
            role: 'admin',
        },
    });

    await prisma.article.createMany({
        data: [
            {
                title: 'My first article',
                summary: 'Mainly about how I started learning coding',
                content: 'This is the full article content.',
                authorId: author.id,
            },
            {
                title: 'My second article',
                summary: 'Mainly about the classes I recommend',
                content: 'Some learning suggestions here.',
                authorId: author.id,
            },
            {
                title: 'My third article',
                summary: 'Mainly about the learning method I recommend',
                content: 'Study structure and tips.',
                authorId: author.id,
            },
        ],
        skipDuplicates: true,
    });

    console.log('✅ Seed done');
}

main()
    .catch((e) => {
        console.error('Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
