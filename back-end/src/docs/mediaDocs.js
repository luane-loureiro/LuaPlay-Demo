/**
 * @openapi
 * tags:
 *   name: Media
 *   description: Gerenciamento de mídias
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único da mídia
 *           example: "641d1234abcd5678ef901234"
 *         title:
 *           type: string
 *           description: Título da mídia
 *           example: "Meu Malvado Favorito"
 *         url:
 *           type: string
 *           description: URL da mídia
 *           example: "http://exemplo.com/video.mp4"
 *         description:
 *           type: string
 *           description: Descrição da mídia
 *           example: "Filme animado divertido"
 *         coverUrl:
 *           type: string
 *           description: URL da capa da mídia
 *           example: "http://exemplo.com/capa.jpg"
 *         duration:
 *           type: number
 *           description: Duração da mídia em segundos
 *           example: 3600
 *         playlistIdOrName:
 *           type: string
 *           description: ID ou nome da playlist
 *           example: "Favoritos"
 *         favorite:
 *           type: boolean
 *           description: Indica se a mídia está favoritada pelo usuário
 *           example: true
 */

/**
 * @openapi
 * /api/medias:
 *   post:
 *     summary: Cria uma nova mídia
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *               - playlistIdOrName
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da mídia
 *                 example: Meu Malvado Favorito
 *               url:
 *                 type: string
 *                 description: URL da mídia
 *                 example: http://exemplo.com/video.mp4
 *               description:
 *                 type: string
 *                 description: Descrição opcional da mídia
 *                 example: Filme animado divertido
 *               coverUrl:
 *                 type: string
 *                 description: URL da capa da mídia
 *                 example: http://exemplo.com/capa.jpg
 *               duration:
 *                 type: number
 *                 description: Duração da mídia em segundos
 *                 example: 3600
 *               playlistIdOrName:
 *                 type: string
 *                 description: ID ou nome da playlist onde a mídia será adicionada
 *                 example: Favoritos
 *     responses:
 *       201:
 *         description: Mídia criada com sucesso
 *       400:
 *         description: Requisição inválida (campos obrigatórios ausentes)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @openapi
 * /api/playlists/{name}/medias:
 *   get:
 *     summary: Listar mídias de uma playlist
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da playlist
 *     responses:
 *       200:
 *         description: Lista de mídias
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
 *         description: Erro interno no servidor
 */

/**
 * @openapi
 * /api/medias/{title}:
 *   delete:
 *     summary: Deleta uma mídia pelo título (se pertencer ao usuário)
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: title
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Título da mídia a ser deletada
 *     responses:
 *       200:
 *         description: Mídia deletada com sucesso
 *       404:
 *         description: Mídia não encontrada
 *       403:
 *         description: Não autorizado a deletar esta mídia
 *       500:
 *         description: Erro no servidor
 */

/**
 * @openapi
 * /api/medias/{id}/favorite:
 *   patch:
 *     summary: Atualiza o status de favorito de uma mídia
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da mídia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favorite:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Mídia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       400:
 *         description: Requisição inválida (campo favorite obrigatório e booleano)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Mídia não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
