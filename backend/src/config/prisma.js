const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connectDB() {
  await prisma.$connect();
}

module.exports = { prisma, connectDB };


