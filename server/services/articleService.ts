import { prisma } from '../prismaClient.js';
import type { ArticleCreateDTO, ArticleUpdateDTO } from '../types/article.js';
import { isPrismaNotFoundError } from '../utils/prismaError.js';

export async function list() {
    return prisma.article.findMany({ where: { published: true }, orderBy: { id: 'desc' } });
}

export async function listDrafts() {
    return prisma.article.findMany({ where: { published: false }, orderBy: { id: 'desc' } });
}

export async function getById(id: number) {
    return prisma.article.findUnique({ where: { id } });
}

export async function create(data: ArticleCreateDTO) {
    const { title, summary, content, authorId, published } = data;
    return prisma.article.create({
        data: { title, summary, content, authorId, published },
    });
}

export async function update(id: number, data: ArticleUpdateDTO) {
    const payload: Record<string, unknown> = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.summary !== undefined) payload.summary = data.summary;
    if (data.content !== undefined) payload.content = data.content;
    if (data.published !== undefined) payload.published = data.published;

    try {
        return await prisma.article.update({
            where: { id },
            data: payload,
        });
    } catch (e) {
        if (isPrismaNotFoundError(e)) return null;
        throw e;
    }
}

export async function remove(id: number) {
    try {
        await prisma.article.delete({ where: { id } });
        return true;
    } catch (e) {
        if (isPrismaNotFoundError(e)) return false;
        throw e;
    }
}