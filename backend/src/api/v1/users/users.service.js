const { prisma } = require('../../../config/prisma');

class UsersService {
  async getProfile(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, username: true, name: true, bio: true, avatar: true, createdAt: true }
    });
  }

  async updateProfile(userId, updates) {
    const allowed = ['name', 'bio', 'avatar'];
    const data = Object.fromEntries(Object.entries(updates).filter(([k]) => allowed.includes(k)));
    return prisma.user.update({ where: { id: userId }, data, select: { id: true, email: true, username: true, name: true, bio: true, avatar: true } });
  }

  async getById(id) {
    return prisma.user.findUnique({ where: { id }, select: { id: true, username: true, name: true, bio: true, avatar: true } });
  }
}

module.exports = { UsersService };


