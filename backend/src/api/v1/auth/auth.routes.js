const { Router } = require('express');
const { AuthController } = require('./auth.controller');
const { authMiddleware } = require('../../../middleware/auth');
const { validateRequest } = require('../../../middleware/validation');
const { registerValidation, loginValidation } = require('./auth.validation');

const router = Router();
const authController = new AuthController();

router.post('/register', validateRequest(registerValidation), authController.register);
router.post('/login', validateRequest(loginValidation), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);

module.exports = router;


