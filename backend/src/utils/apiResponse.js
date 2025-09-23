class ApiResponse {
  static success(res, data = null, extra = {}) {
    return res.json({ success: true, data, ...extra });
  }

  static created(res, data = null, message = 'Created') {
    return res.status(201).json({ success: true, data, message });
  }

  static error(res, code = 500, error = 'Server Error') {
    return res.status(code).json({ success: false, error });
  }

  static notFound(res, error = 'Not Found') {
    return this.error(res, 404, error);
  }
}

module.exports = { ApiResponse };


