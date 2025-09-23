const { ApiResponse } = require('../../../utils/apiResponse');
const { UploadService } = require('./upload.service');

class UploadController {
  constructor() {
    this.uploadService = new UploadService();
  }

  uploadImage = async (req, res, next) => {
    try {
      if (!req.file) return ApiResponse.error(res, 400, 'No file provided');
      const result = await this.uploadService.uploadImage(req.file.path);
      return ApiResponse.created(res, result, 'Image uploaded');
    } catch (error) { next(error); }
  };

  deleteImage = async (req, res, next) => {
    try {
      const { publicId } = req.body;
      if (!publicId) return ApiResponse.error(res, 400, 'publicId required');
      await this.uploadService.deleteImage(publicId);
      return ApiResponse.success(res, null, 'Image deleted');
    } catch (error) { next(error); }
  };
}

module.exports = { UploadController };


