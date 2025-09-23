const bcrypt = require('bcryptjs');

async function hashPassword(plain, saltRounds = 10) {
  return bcrypt.hash(plain, saltRounds);
}

async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

module.exports = { hashPassword, comparePassword };


