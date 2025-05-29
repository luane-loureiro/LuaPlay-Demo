const playlistController = require('../../src/controllers/playlistController');
const Playlist = require('../../src/models/Playlist');
const Media = require('../../src/models/Media');

jest.mock('../../src/models/Playlist');
jest.mock('../../src/models/Media');

describe('playlistController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: 'user123' },
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('listPlaylists', () => {
    it('retorna playlists com status 200', async () => {
      Playlist.find.mockResolvedValue([{ name: 'Playlist 1' }]);
      await playlistController.listPlaylists(req, res);
      expect(Playlist.find).toHaveBeenCalledWith({ user: 'user123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ name: 'Playlist 1' }]);
    });

    it('retorna 401 se user.id ausente', async () => {
      req.user = null;
      await playlistController.listPlaylists(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('retorna 500 em erro', async () => {
      Playlist.find.mockRejectedValue(new Error());
      await playlistController.listPlaylists(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('createPlaylist', () => {
    it('cria nova playlist com sucesso', async () => {
      req.body = { name: 'Nova', color: '#FF0000' };
      Playlist.findOne.mockResolvedValue(null);
      Playlist.prototype.save = jest.fn().mockResolvedValue();
      await playlistController.createPlaylist(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('retorna erro se nome faltar', async () => {
      req.body = {};
      await playlistController.createPlaylist(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('retorna erro se cor inválida', async () => {
      req.body = { name: 'Nova', color: 'vermelho' };
      await playlistController.createPlaylist(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('retorna erro se nome já existe', async () => {
      req.body = { name: 'Nova' };
      Playlist.findOne.mockResolvedValue(true);
      await playlistController.createPlaylist(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getMediasFromPlaylistByName', () => {
    it('retorna mídias se playlist existir', async () => {
      req.params.name = 'Favoritas';
      const fakePlaylist = { _id: 'p1' };
      Playlist.findOne.mockResolvedValue(fakePlaylist);
      Media.find.mockResolvedValue([{ title: 'Música' }]);
      await playlistController.getMediasFromPlaylistByName(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('retorna 404 se nome inválido', async () => {
      req.params.name = '';
      await playlistController.getMediasFromPlaylistByName(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('retorna 404 se playlist não existir', async () => {
      req.params.name = 'X';
      Playlist.findOne.mockResolvedValue(null);
      await playlistController.getMediasFromPlaylistByName(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deletePlaylistByName', () => {
    it('deleta com sucesso', async () => {
      req.params.name = 'Favoritas';
      Playlist.findOneAndDelete.mockResolvedValue({ name: 'Favoritas' });
      await playlistController.deletePlaylistByName(req, res);
      expect(res.json).toHaveBeenCalledWith({ message: 'Playlist deletada com sucesso' });
    });

    it('retorna 404 se nome inválido', async () => {
      req.params.name = '';
      await playlistController.deletePlaylistByName(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('retorna 404 se não encontrada', async () => {
      req.params.name = 'X';
      Playlist.findOneAndDelete.mockResolvedValue(null);
      await playlistController.deletePlaylistByName(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('addMediaToPlaylist', () => {
    it('adiciona mídia à playlist', async () => {
      req.params.name = 'Favoritas';
      req.body = {
        title: 'Nova Música',
        url: 'http://musica.com',
        description: '',
        coverUrl: '',
        duration: 123
      };
      const playlistMock = { _id: 'p1', medias: [], save: jest.fn() };
      Playlist.findOne.mockResolvedValue(playlistMock);
      Media.prototype.save = jest.fn().mockResolvedValue({ title: 'Nova Música' });
      await playlistController.addMediaToPlaylist(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('retorna 400 se faltam campos obrigatórios', async () => {
      req.body = { title: '' };
      await playlistController.addMediaToPlaylist(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('retorna 404 se playlist não encontrada', async () => {
      req.params.name = 'Inexistente';
      req.body = { title: 'Música', url: 'http://url.com' };
      Playlist.findOne.mockResolvedValue(null);
      await playlistController.addMediaToPlaylist(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
