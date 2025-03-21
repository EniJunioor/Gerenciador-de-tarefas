const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendMfaCodeByEmail } = require('../services/mfaService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  // Gera e envia código MFA
  await sendMfaCodeByEmail(user.email, user._id);

  res.json({ userId: user._id, message: 'Código MFA enviado para o e-mail.' });
};

const verifyMfa = async (req, res) => {
  const { userId, mfaCode } = req.body;

  const user = await User.findById(userId);

  if (!user || user.mfaCode !== mfaCode || user.mfaExpires < Date.now()) {
    return res.status(401).json({ message: 'Código MFA inválido ou expirado.' });
  }

  // Gera token JWT após sucesso no MFA
  const token = jwt.sign({ id: user._id, email: user.email, mfaVerified: true }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};

module.exports = { login, verifyMfa };
