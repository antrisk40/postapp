function validateRequest(schema) {
  return (req, res, next) => {
    if (!schema) return next();
    const { error, value } = schema.validate(
      { body: req.body, query: req.query, params: req.params },
      { abortEarly: false, allowUnknown: true }
    );
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details.map(d => d.message)
      });
    }
    req.body = value.body || req.body;
    req.query = value.query || req.query;
    req.params = value.params || req.params;
    next();
  };
}

module.exports = { validateRequest };


