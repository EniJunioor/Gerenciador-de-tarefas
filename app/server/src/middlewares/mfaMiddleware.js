const User = require('../models/User');

const mfaMiddleware = async (req, res, next) => {
  const { userId, mfaCode } = req.body;

  if (!userId || !mfaCode) {
    return res.status(400).json({ message: 'Código MFA ou ID do usuário não fornecido.' });
  }

  const user = await User.findById(userId);

  if (!user || user.mfaCode !== mfaCode || user.mfaExpires < Date.now()) {
    return res.status(401).json({ message: 'Código MFA inválido ou expirado.' });
  }

  // Se passou na MFA, liberar acesso
  next();
};

module.exports = mfaMiddleware;
