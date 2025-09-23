const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../../../config/prisma');

class AuthService {
  async register({ email, username, password, name, avatar }) {
    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
    if (existing) {
      const err = new Error('Email or username already in use');
      err.status = 409;
      throw err;
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, username, password: hashed, name, avatar } });
    return this.#generateAuthResponse(user);
  }

  async login({ emailOrUsername, password }) {
    const user = await prisma.user.findFirst({ where: { OR: [{ email: emailOrUsername }, { username: emailOrUsername }] } });
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }
    return this.#generateAuthResponse(user);
  }

  #generateAuthResponse(user) {
    const payload = { sub: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    const safeUser = { id: user.id, email: user.email, username: user.username, name: user.name, avatar: user.avatar };
    return { token, user: safeUser };
  }
}

module.exports = { AuthService };


