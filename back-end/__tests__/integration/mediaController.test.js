// __tests__/integration/mediaRoutes.test.js
require('dotenv').config();

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const mediaRoutes = require('../../src/routes/mediaRoutes');
const Playlist = require('../../src/models/Playlist');
const User = require('../../src/models/User');
const app = express();
app.use(bodyParser.json());
app.use('/medias', mediaRoutes);

jest.setTimeout(20000);

let token;
let userId;

beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI não está definida.');

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await mongoose.connection.asPromise();

    // Cria um userId fake e um token válido
    userId = new mongoose.Types.ObjectId();
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '1h',
    });
});

afterAll(async () => {
    if (process.env.NODE_ENV !== 'production') {
        await mongoose.connection.dropDatabase().catch(() => { });
    }
    await mongoose.connection.close();
});

describe('Media API Integration', () => {
    it('GET /medias deve retornar lista de mídias', async () => {
        const response = await request(app)
            .get('/medias')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /medias deve criar uma nova mídia', async () => {
        // Cria uma playlist associada ao usuário autenticado
        const playlist = await Playlist.create({
            name: 'Minha Playlist Teste',
            user: userId,
            color: 'blue',
        });

        // Dados da nova mídia
        const newMedia = {
            title: 'Nova Mídia',
            description: 'Descrição teste',
            url: 'http://exemplo.com/midia.mp3',
            coverUrl: 'http://exemplo.com/capa.jpg',
            duration: 180,
            playlistIdOrName: 'Minha Playlist Teste' 
        };

        // Faz o POST
        const response = await request(app)
            .post('/medias')
            .set('Authorization', `Bearer ${token}`)
            .send(newMedia);

        // Verifica a resposta
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe('Nova Mídia');
    });
});
