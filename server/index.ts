import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import articleRoutes from './routes/articles.js';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(helmet());

app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

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

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});