import express from 'express';
import cors from 'cors';
import session from 'express-session';
import produtoRoutes from './routes/produtoRoutes';
import authRoutes from './routes/authRoutes';
import { requireAuth } from './middlewares/requireAuth';
import { conectarMongoDB } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',    // Frontend local
  'http://frontend:3000',     // Frontend no Docker
];

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

// Rotas públicas
app.use(authRoutes);

// Rotas protegidas
app.use('/produtos/:id', requireAuth);

// Rotas de produtos
app.use('/produtos', produtoRoutes);

// Porta do servidor
const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, '0.0.0.0', async () => {  // ⬅️ Adicione '0.0.0.0' aqui
  await conectarMongoDB();
  console.log(`API rodando em http://0.0.0.0:${PORT}/produtos`);
});