import { PrismaClient } from './server/generated/prisma/index.js';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
    await prisma.article.createMany({
        data: [
            {
                title: "My first article",
                summary: "Mainly about how I started learning coding",
                content: "This is the full article content."
            },
            {
                title: "My second article",
                summary: "Mainly about the classes I recommend",
                content: "Some learning suggestions here."
            },
            {
                title: "My third article",
                summary: "Mainly about the learning method I recommend",
                content: "Study structure and tips."
            }
        ]
    });

    console.log("✅ Data has been created");
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
