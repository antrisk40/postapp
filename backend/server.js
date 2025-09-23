require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./src/config/prisma');
const { logger } = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📖 API Documentation: http://localhost:${PORT}/api/v1/docs`);
      logger.info(`🔍 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();


