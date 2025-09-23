// backend/server.ts
import app from './app';
import { connectDB } from './src/config/database';
import { logger } from './src/utils/logger';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to database
    await connectDB();
    
    // Start server
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