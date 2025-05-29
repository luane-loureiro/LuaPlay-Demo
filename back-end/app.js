console.log('NODE_ENV:', process.env.NODE_ENV);
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger');

const app = express();
app.use(express.json()); // Parse JSON

// 2. CORS deve vir ANTES de qualquer rota ou middleware
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// 3. Middleware de autenticação fake SOMENTE no ambiente de teste
if (process.env.NODE_ENV === 'test') {
  const fakeAuth = require('./src/middlewares/fakeAuth');
  app.use(fakeAuth); // 👈 Ele precisa vir ANTES das rotas
}

// 4. Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 5. Rotas
const authRoutes = require('./src/routes/authRoutes');
const playlistRoutes = require('./src/routes/playlistRoutes');
const mediaRoutes = require('./src/routes/mediaRoutes');

app.use('/auth', authRoutes);
app.use('/api/playlists', playlistRoutes); // 👈 Esse usa o fakeAuth
app.use('/api/medias', mediaRoutes);

module.exports = app;