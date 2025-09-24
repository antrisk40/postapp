const { Router } = require('express');
const multer = require('multer');
const os = require('os');
const path = require('path');
const { UploadController } = require('./upload.controller');
const { authMiddleware } = require('../../../middleware/auth');

const router = Router();
const uploadController = new UploadController();
const upload = multer({ dest: path.join(os.tmpdir(), 'uploads') });

router.post('/', authMiddleware, upload.single('image'), uploadController.uploadImage);
router.delete('/', authMiddleware, uploadController.deleteImage);

module.exports = router;


