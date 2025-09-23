const { cloudinary } = require('../../../config/cloudinary');

class UploadService {
  async uploadImage(filePath, folder = 'post-app') {
    const res = await cloudinary.uploader.upload(filePath, { folder });
    return { url: res.secure_url, publicId: res.public_id }; 
  }

  async deleteImage(publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
}

module.exports = { UploadService };


