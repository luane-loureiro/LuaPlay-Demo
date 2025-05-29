const Media = require('../models/Media');
const Playlist = require('../models/Playlist');

/**
 * Lista todas as mídias com os dados da playlist populados
 */
async function listMedias(req, res) {
  try {
    const medias = await Media.find().populate('playlist', 'name color');
    res.status(200).json(medias);
  } catch (error) {
    console.error('Erro ao listar mídias:', error);
    res.status(500).json({ message: 'Erro ao listar mídias' });
  }
}

/**
 * Cria uma nova mídia e associa a uma playlist (pela playlistIdOrName)
 */
async function createMedia(req, res) {
  try {
    const { title, description, url, coverUrl, duration, playlistIdOrName } = req.body;

    if (!title || !url || !playlistIdOrName) {
      return res.status(400).json({ message: 'Título, URL e playlistIdOrName são obrigatórios' });
    }

    const finalPlaylistId = await getPlaylistIdFromName(playlistIdOrName);

    if (!finalPlaylistId) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    const media = new Media({
      title,
      description,
      url,
      coverUrl,
      duration,
      playlist: finalPlaylistId
    });

    await media.save();
    res.status(201).json(media);
  } catch (err) {
    console.error('Erro ao criar mídia:', err);
    res.status(500).json({ message: 'Erro ao criar mídia' });
  }
}

/**
 * Deleta uma mídia pelo título, considerando apenas as playlists do usuário
 */
async function deleteMediaByTitle(req, res) {
  try {
    const { title } = req.params;

    const deleted = await Media.findOneAndDelete({
      title,
      playlist: { $in: await getUserPlaylistIds(req.user.id) }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Mídia não encontrada' });
    }

    res.status(200).json({ message: 'Mídia deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar mídia:', err);
    res.status(500).json({ message: 'Erro ao deletar mídia' });
  }
}

/**
 * Atualiza o campo "favorite" de uma mídia
 */
async function toggleFavorite(req, res) {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    if (typeof favorite !== 'boolean') {
      return res.status(400).json({ message: 'O campo favorite deve ser booleano.' });
    }

    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: 'Mídia não encontrada.' });
    }

    media.favorite = favorite;
    await media.save();

    res.status(200).json(media);
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error);
    res.status(500).json({ message: 'Erro ao atualizar favorito' });
  }
}

/**
 * Retorna os IDs das playlists de um usuário
 */
async function getUserPlaylistIds(userId) {
  const playlists = await Playlist.find({ user: userId }).select('_id');
  return playlists.map(p => p._id);
}

/**
 * Busca uma playlist pelo nome e retorna seu _id
 */
async function getPlaylistIdFromName(name) {
  if (!name) return null;
  const playlist = await Playlist.findOne({ name });
  return playlist ? playlist._id : null;
}

module.exports = {
  listMedias,
  createMedia,
  deleteMediaByTitle,
  toggleFavorite,
  getPlaylistIdFromName,
  getUserPlaylistIds
};
