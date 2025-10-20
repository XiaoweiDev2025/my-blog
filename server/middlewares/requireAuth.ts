import type { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session?.user) return next();
    return res.status(401).json({ error: "Unauthorized" });
}