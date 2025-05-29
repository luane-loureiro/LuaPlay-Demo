const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const auth = require('../middlewares/authMiddleware');

// Listar todas as mídias do usuário autenticado
router.get('/', auth, mediaController.listMedias);

// Criar nova mídia - recebe playlistId ou playlistIdOrName no body
router.post('/', auth, mediaController.createMedia);

// Deletar mídia pelo título (garante que mídia pertence ao usuário autenticado)
router.delete('/:title', auth, mediaController.deleteMediaByTitle);

// Atualizar o campo "favorite" da mídia pelo ID
router.patch('/:id/favorite', auth, mediaController.toggleFavorite);

module.exports = router;
