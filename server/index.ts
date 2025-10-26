import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import 'dotenv/config';

import articleRoutes from './routes/articles.js';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(helmet());

app.use(cookieParser());

const allowedOrigins = [
    process.env.CORS_ORIGIN || '',
    'http://localhost:5173',
];
app.use(
    cors({
        origin(origin, cb) {
            if (!origin) return cb(null, true);
            if (allowedOrigins.some(o => o && origin.startsWith(o))) return cb(null, true);
            return cb(null, false);
        },
        credentials: true,
    })
);

app.use(express.json());

app.set('trust proxy', 1);
app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 8,
    },
}));

app.get('/api/health', (_req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

const clientDist = path.join(__dirname, 'client');
app.use(express.static(clientDist));

app.get('/{*all}', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});