import { prisma } from "../prismaClient.js";

export async function findCommentsByArticle(articleId: number) {
    return prisma.comment.findMany({
        where: { articleId },
        orderBy: { createdAt: "desc" },
    });
}

export async function createCommentForArticle(articleId: number, author: string, body: string) {
    return prisma.comment.create({
        data: {
            articleId,
            author: author.slice(0, 50),
            body: body.trim(),
        },
    });
}