const express = require('express');
const { login, verifyMfa } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Endpoints relacionados à autenticação de usuários
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Retorna um token JWT se as credenciais estiverem corretas.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/verify-mfa:
 *   post:
 *     summary: Verifica o código de autenticação multifator
 *     description: Valida o código MFA e retorna um token JWT se for válido.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               code:
 *                 type: string
 *                 description: Código MFA recebido pelo usuário
 *     responses:
 *       200:
 *         description: MFA validado com sucesso
 *       401:
 *         description: Código inválido ou expirado
 */
router.post('/verify-mfa', verifyMfa);

module.exports = router;