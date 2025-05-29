/**
 * @openapi
 * tags:
 *   name: Playlist
 *   description: Gerenciamento de playlists
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123"
 *         name:
 *           type: string
 *           example: Minha Playlist
 *         description:
 *           type: string
 *           example: Playlist para músicas favoritas
 *         userId:
 *           type: string
 *           example: "user123"
 *         color:
 *           type: string
 *           description: Cor personalizada da playlist (hexadecimal)
 *           example: "#ff5733"
 *     Media:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "media123"
 *         title:
 *           type: string
 *           example: Meu Malvado Favorito
 *         url:
 *           type: string
 *           example: http://exemplo.com/video.mp4
 *         description:
 *           type: string
 *           example: Filme animado divertido
 *         coverUrl:
 *           type: string
 *           example: http://exemplo.com/capa.jpg
 *         duration:
 *           type: number
 *           example: 3600
 *         playlistIdOrName:
 *           type: string
 *           example: Favoritos
 *   requestBodies:
 *     CreatePlaylist:
 *       description: Dados para criar uma nova playlist
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome único da playlist para o usuário
 *                 example: Minha Playlist
 *               description:
 *                 type: string
 *                 description: Descrição da playlist
 *                 example: Playlist para músicas favoritas
 *               color:
 *                 type: string
 *                 description: Cor personalizada da playlist (hexadecimal)
 *                 example: "#00aaff"
 */

/**
 * @openapi
 * /api/playlists:
 *   get:
 *     summary: Lista as playlists do usuário autenticado
 *     tags: [Playlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 *       401:
 *         description: Não autorizado
 *
 *   post:
 *     summary: Cria uma nova playlist (nome único por usuário)
 *     tags: [Playlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreatePlaylist'
 *     responses:
 *       201:
 *         description: Playlist criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Requisição inválida ou nome já existe
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */

/**
 * @openapi
 * /api/playlists/{name}/medias:
 *   get:
 *     summary: Lista todas as mídias de uma playlist pelo nome
 *     tags: [Playlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da playlist do usuário autenticado
 *     responses:
 *       200:
 *         description: Lista de mídias da playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Media'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro no servidor
 */

/**
 * @openapi
 * /api/playlists/{name}:
 *   delete:
 *     summary: Deleta uma playlist pelo nome do usuário autenticado
 *     tags: [Playlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da playlist a ser deletada
 *     responses:
 *       200:
 *         description: Playlist deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Playlist deletada com sucesso
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro no servidor
 */
