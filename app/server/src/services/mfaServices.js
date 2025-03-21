const crypto = require('crypto');
const User = require('../models/User');
const emailService = require('../config/emailService');

const generateMfaCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendMfaCodeByEmail = async (email, userId) => {
  const mfaCode = generateMfaCode();
  const expires = Date.now() + 10 * 60 * 1000; // Código expira em 10 min

  await User.findByIdAndUpdate(userId, { mfaCode, mfaExpires: expires });

  await emailService.sendEmail(email, 'Seu código MFA', `Seu código é: ${mfaCode}`);
};

module.exports = { generateMfaCode, sendMfaCodeByEmail };
