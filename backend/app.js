// backend/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// Import middleware
import { corsConfig } from './src/middleware/cors';
import { rateLimitMiddleware } from './src/middleware/rateLimit';
import { errorHandler } from './src/middleware/errorHandler';

// Import API versions
import v1Routes from './src/api/v1';
// import v2Routes from './src/api/v2'; // Future version

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// CORS configuration
app.use(cors(corsConfig));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimitMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API versioning
app.use('/api/v1', v1Routes);
// app.use('/api/v2', v2Routes); // Future version

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `${req.method} ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

export default app;