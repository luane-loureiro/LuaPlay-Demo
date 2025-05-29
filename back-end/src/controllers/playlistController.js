const Playlist = require('../models/Playlist');
const Media = require('../models/Media');

async function listPlaylists(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Token ou usuário inválido' });
    }

    const playlists = await Playlist.find({ user: req.user.id });
    res.status(200).json(playlists);
  } catch (error) {
    console.error('Erro ao listar playlists:', error);
    res.status(500).json({ message: 'Erro ao listar playlists' });
  }
}

async function createPlaylist(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Token ou usuário inválido' });
    }

    const { name, description, color } = req.body;
    if (!name) return res.status(400).json({ message: 'Nome é obrigatório' });

    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    if (color && !colorRegex.test(color)) {
      return res.status(400).json({ message: 'Cor inválida. Use formato HEX, ex: #FF0000' });
    }

    const exists = await Playlist.findOne({ name, user: req.user.id });
    if (exists) return res.status(400).json({ message: 'Nome da playlist já existe para este usuário' });

    const playlist = new Playlist({ name, description, color, user: req.user.id });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    console.error('Erro ao criar playlist:', err);
    res.status(500).json({ message: 'Erro ao criar playlist' });
  }
}

const getMediasFromPlaylistByName = async (req, res) => {
  try {
    const playlistName = req.params.name;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    if (!playlistName || typeof playlistName !== 'string' || playlistName.trim() === '') {
      return res.status(404).json({ message: 'Playlist não encontrada' }); // <- TRATAMENTO PARA NOME INVÁLIDO
    }

    const playlist = await Playlist.findOne({ name: playlistName, user: userId });

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' }); // <- ESSENCIAL
    }

    const medias = await Media.find({ playlist: playlist._id });

    return res.status(200).json(medias);

  } catch (error) {
    console.error('Erro ao buscar mídias da playlist:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};



async function deletePlaylistByName(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Token ou usuário inválido' });
    }

    const { name } = req.params;

    // Se o nome não existe ou é vazio, retorne 404
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    const deleted = await Playlist.findOneAndDelete({ name, user: req.user.id });

    if (!deleted) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    res.json({ message: 'Playlist deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar playlist:', err);
    res.status(500).json({ message: 'Erro ao deletar playlist' });
  }
}

async function addMediaToPlaylist(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Token ou usuário inválido' });
    }

    const { name } = req.params;
    const { title, description, url, coverUrl, duration } = req.body;

    if (!title || !url) {
      return res.status(400).json({ message: 'Título e URL são obrigatórios' });
    }

    const playlist = await Playlist.findOne({ name, user: req.user.id });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    const media = new Media({
      title,
      description,
      url,
      coverUrl,
      duration,
      playlist: playlist._id
    });

    await media.save();

    if (!playlist.medias.includes(media._id)) {
      playlist.medias.push(media._id);
      await playlist.save();
    }

    res.status(201).json(media);
  } catch (err) {
    console.error('Erro ao adicionar mídia à playlist:', err);
    res.status(500).json({ message: 'Erro interno ao adicionar mídia à playlist' });
  }
}

module.exports = {
  listPlaylists,
  createPlaylist,
  getMediasFromPlaylistByName,
  deletePlaylistByName,
  addMediaToPlaylist,
};
