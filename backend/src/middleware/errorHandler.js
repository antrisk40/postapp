const { logger } = require('../utils/logger');
const { ApiResponse } = require('../utils/apiResponse');

function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message || err);
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || err.code || 500;
  const message = err.message || 'Internal Server Error';
  return ApiResponse.error(res, status, message);
}

module.exports = { errorHandler };


