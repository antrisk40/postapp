const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const { corsConfig, rateLimitMiddleware, errorHandler } = require('./src/middleware');

const v1Routes = require('./src/api/v1');

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

app.use(cors(corsConfig));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(rateLimitMiddleware);

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

app.use('/api/v1', v1Routes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `${req.method} ${req.originalUrl} not found`
  });
});

app.use(errorHandler);

module.exports = app;