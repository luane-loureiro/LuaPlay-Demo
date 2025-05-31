require('dotenv').config(); 
console.log('NODE_ENV:', process.env.NODE_ENV);

const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger');

const app = express();
app.use(express.json());

// CORS – Adicione URLs de produção aqui também
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://lua-play-frontend.onrender.com', // 🔁 Substitua pelo seu domínio real
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS bloqueado para:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware de autenticação fake apenas no ambiente de teste
if (process.env.NODE_ENV === 'test') {
  const fakeAuth = require('./src/middlewares/fakeAuth');
  app.use(fakeAuth);
}

// Swagger (documentação)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
const authRoutes = require('./src/routes/authRoutes');
const playlistRoutes = require('./src/routes/playlistRoutes');
const mediaRoutes = require('./src/routes/mediaRoutes');

app.use('/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/medias', mediaRoutes);

// Middleware genérico para erros (ex: CORS, rotas inexistentes)
app.use((err, req, res, next) => {
  console.error('Erro:', err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
