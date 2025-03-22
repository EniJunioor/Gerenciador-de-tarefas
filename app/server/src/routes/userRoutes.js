const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware.js');
const User = require('../models/User');
const router = express.Router();

require('dotenv').config();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de Usuarios
 */


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
 *     description: Cria um novo usuário com nome, e-mail e senha. A senha deve ser confirmada para garantir a segurança.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "senha123"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "660faa3d4b8e3c001b57f6ab"
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao@email.com"
 *       400:
 *         description: "Erro na solicitação (exemplo: e-mail já cadastrado, senhas não coincidem, nome igual à senha)"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "As senhas não coincidem."
 *       500:
 *         description: Erro interno ao criar o usuário
 */

//CRIAÇÂO DO USUARIO
router.post('/register', async (req, res) => {
  try {
      const { name, email, password, confirmPassword } = req.body;

      // Verifica se as senhas coincidem
      if (password !== confirmPassword) {
          return res.status(400).json({ message: "As senhas não coincidem." });
      }

      // Validação: Nome e senha não podem ser iguais
      if (name === password) {
          return res.status(400).json({ message: "O nome e a senha não podem ser iguais." });
      }

      // Verifica se o e-mail já está em uso
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'E-mail já cadastrado' });

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria usuário
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ 
          message: 'Usuário criado com sucesso', 
          id: newUser._id, 
          name: newUser.name, 
          email: newUser.email 
      });
  } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
  }
});


  
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Users]
 *     description: Autentica um usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno ao realizar login
 */

// Login do usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    // Verifica a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    // Gera o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
});


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obter todos os usuários
 *     tags: [Users]
 *     description: Retorna a lista de todos os usuários cadastrados (rota protegida).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários encontrada
 *       401:
 *         description: Acesso negado (Token não fornecido ou inválido)
 *       500:
 *         description: Erro interno ao buscar usuários
 */

// ✅ Protegendo a rota com o middleware
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
});


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Users]
 *     description: Atualiza os dados de um usuário pelo ID (rota protegida).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Atualizado"
 *               email:
 *                 type: string
 *                 example: "joao.novo@email.com"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao atualizar usuário
 */

// Atualizar usuário (Protegido)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

    if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json({ message: 'Usuário atualizado com sucesso', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
});


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deletar um usuário
 *     tags: [Users]
 *     description: Remove um usuário do sistema pelo ID (rota protegida).
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao deletar usuário
 */

// Deletar usuário (Protegido)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
});

module.exports = router;
