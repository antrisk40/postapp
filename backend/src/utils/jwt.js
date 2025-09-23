const jwt = require('jsonwebtoken');

function sign(payload, options = {}) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign(payload, secret, { expiresIn: '7d', ...options });
}

function verify(token) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.verify(token, secret);
}

module.exports = { sign, verify };


