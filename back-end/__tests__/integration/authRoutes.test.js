// __tests__/integration/authRoutes.test.js
require('dotenv').config();
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('../../src/routes/authRoutes'); // ou ajuste o caminho
const User = require('../../src/models/User');

const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('MONGO_URI não definida');
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Routes Integration', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  it('POST /auth/register - deve registrar usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testeUser',
        email: 'teste@teste.com',
        password: '123456'
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Usuário criado com sucesso');
  });

  it('POST /auth/login - deve logar e retornar token', async () => {
    // cria usuário
    await request(app)
      .post('/auth/register')
      .send({
        username: 'testeLogin',
        email: 'login@teste.com',
        password: 'senha123'
      });

    // tenta logar
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'login@teste.com',
        password: 'senha123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toMatchObject({
      username: 'testeLogin',
      email: 'login@teste.com'
    });
  });

  it('POST /auth/login - deve falhar com senha errada', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        username: 'falha',
        email: 'falha@teste.com',
        password: '123'
      });

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'falha@teste.com',
        password: 'errada'
      });

    expect(res.status).toBe(401);
  });
});
