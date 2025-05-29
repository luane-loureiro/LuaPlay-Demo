// playlistRoutes.js
const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

const auth = process.env.NODE_ENV === 'test'
  ? require('../middlewares/fakeAuth')
  : require('../middlewares/authMiddleware');

router.get('/', auth, playlistController.listPlaylists);
router.post('/', auth, playlistController.createPlaylist);
router.get('/:name/medias', auth, playlistController.getMediasFromPlaylistByName);
router.delete('/:name', auth, playlistController.deletePlaylistByName);
router.post('/:name/medias', auth, playlistController.addMediaToPlaylist);

module.exports = router;
