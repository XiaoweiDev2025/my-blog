import express from 'express';
import cors from 'cors';
import { PrismaClient } from './server/generated/prisma/index.js';
const prisma = new PrismaClient();
import 'dotenv/config';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/articles', async (req, res) => {
    const articles = await prisma.article.findMany();
    res.json(articles);
});

app.get('/api/articles/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const article = await prisma.article.findUnique({
        where: { id },
    });
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: 'Article not found' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
