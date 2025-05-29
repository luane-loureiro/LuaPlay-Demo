/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação e registro de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: luane@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: SenhaSegura123
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: luane123
 *         email:
 *           type: string
 *           format: email
 *           example: luane@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: SenhaSegura123
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: E-mail e senha necessários
 *       401:
 *         description: Login inválido
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       409:
 *         description: Nome de usuário ou e-mail já existente
 *       500:
 *         description: Erro no servidor
 */
