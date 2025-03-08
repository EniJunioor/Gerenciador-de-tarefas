const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Verifica se o e-mail já está em uso
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'E-mail já cadastrado' });
  
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Cria usuário
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      console.error('Erro no registro:', error);  // Adicionando log do erro
      res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
  });
  
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

// Middleware para verificar token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Acesso negado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

// Obter todos os usuários (Protegido)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
});

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
