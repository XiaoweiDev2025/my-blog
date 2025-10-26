import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function isPrismaNotFoundError(e: unknown): boolean {
    return e instanceof PrismaClientKnownRequestError && e.code === 'P2025';
}