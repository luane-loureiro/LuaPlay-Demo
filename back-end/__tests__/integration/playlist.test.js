const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app'); 
const Playlist = require('../../src/models/Playlist');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await Playlist.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const mockUser = { id: new mongoose.Types.ObjectId().toString() };

describe('Testando rotas de playlists', () => {
  test('GET /api/playlists deve retornar 200 e array com playlists do usuário', async () => {
    await Playlist.create({ name: 'Test', user: mockUser.id });

    const res = await request(app)
      .get('/api/playlists')
      .set('x-user-id', mockUser.id);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Test', user: mockUser.id }),
      ])
    );
  });

  test('GET /api/playlists retorna 401 se não enviar usuário', async () => {
    const res = await request(app)
      .get('/api/playlists');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/playlists deve criar nova playlist com dados válidos', async () => {
    const novaPlaylist = {
      name: 'Minha Playlist',
      description: 'Descrição legal',
      color: '#FF0000'
    };

    const res = await request(app)
      .post('/api/playlists')
      .send(novaPlaylist)
      .set('x-user-id', mockUser.id);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(novaPlaylist.name);
    expect(res.body.description).toBe(novaPlaylist.description);
    expect(res.body.color).toBe(novaPlaylist.color);
  });

  test('POST /api/playlists falha ao criar sem nome', async () => {
    const res = await request(app)
      .post('/api/playlists')
      .send({ color: '#FFFFFF' })
      .set('x-user-id', mockUser.id);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/playlists falha ao criar com cor inválida', async () => {
    const res = await request(app)
      .post('/api/playlists')
      .send({ name: 'Playlist', color: 'red' })
      .set('x-user-id', mockUser.id);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/playlists falha ao criar playlist com nome duplicado', async () => {
    await Playlist.create({ name: 'Duplicada', user: mockUser.id });

    const res = await request(app)
      .post('/api/playlists')
      .send({ name: 'Duplicada' })
      .set('x-user-id', mockUser.id);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('DELETE /api/playlists/:name deve deletar playlist existente', async () => {
    await Playlist.create({ name: 'Apagar', user: mockUser.id });

    const res = await request(app)
      .delete('/api/playlists/Apagar')
      .set('x-user-id', mockUser.id);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Playlist deletada com sucesso');
  });

  test('DELETE /api/playlists/:name retorna 404 se playlist não existir', async () => {
    const res = await request(app)
      .delete('/api/playlists/NaoExiste')
      .set('x-user-id', mockUser.id);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
  });

  test('DELETE /api/playlists/:name retorna 401 se não enviar usuário', async () => {
    const res = await request(app)
      .delete('/api/playlists/Qualquer');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});
