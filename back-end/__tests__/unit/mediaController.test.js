// mediaController.test.js (unitário)
const mediaController = require('../../src/controllers/mediaController');
const Media = require('../../src/models/Media');
const Playlist = require('../../src/models/Playlist');

jest.mock('../../src/models/Media');
jest.mock('../../src/models/Playlist');

describe('Media Controller - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMedia', () => {
    it('deve retornar 400 se faltar title, url ou playlistIdOrName', async () => {
      const req = { body: { title: '', url: '', playlistIdOrName: '' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await mediaController.createMedia(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    });

    it('deve retornar 404 se playlist não for encontrada', async () => {
      const req = { body: { title: 'Teste', url: 'http://url', playlistIdOrName: 'abc' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock da função Playlist.findOne para retornar null (playlist não encontrada)
      Playlist.findOne.mockResolvedValue(null);

      await mediaController.createMedia(req, res);

      expect(Playlist.findOne).toHaveBeenCalledWith({ name: 'abc' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Playlist não encontrada' });
    });

it('deve criar e salvar a mídia com playlist existente', async () => {
  const req = {
    body: {
      title: 'Teste',
      url: 'http://url',
      playlistIdOrName: 'playlistName',
      description: 'desc',
      coverUrl: 'cover',
      duration: 120
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  // Mock Playlist.findOne para simular retorno do _id
  Playlist.findOne.mockResolvedValue({ _id: 'playlistId123' });

  // Mock para salvar mídia com propriedades esperadas
  const mockSave = jest.fn().mockResolvedValue(true);
  Media.mockImplementation(() => ({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    coverUrl: req.body.coverUrl,
    duration: req.body.duration,
    playlist: 'playlistId123',
    save: mockSave
  }));

  await mediaController.createMedia(req, res);

  expect(Playlist.findOne).toHaveBeenCalledWith({ name: 'playlistName' });
  expect(mockSave).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Teste' }));
});
  });
});
