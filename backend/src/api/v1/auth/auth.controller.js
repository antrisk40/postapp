const { ApiResponse } = require('../../../utils/apiResponse');
const { AuthService } = require('./auth.service');
const { UsersService } = require('../users/users.service');

class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.usersService = new UsersService();
  }

  register = async (req, res, next) => {
    try {
      const { email, username, password, name, avatar } = req.body;
      const result = await this.authService.register({ email, username, password, name, avatar });
      return ApiResponse.created(res, result, 'Registered successfully');
    } catch (error) { next(error); }
  };

  login = async (req, res, next) => {
    try {
      const { emailOrUsername, password } = req.body;
      const result = await this.authService.login({ emailOrUsername, password });
      return ApiResponse.success(res, result, 'Login successful');
    } catch (error) { next(error); }
  };

  logout = async (req, res, next) => {
    try {
      // Stateless JWT: client should discard token. Placeholder for blacklist if needed.
      return ApiResponse.success(res, null, 'Logged out');
    } catch (error) { next(error); }
  };

  me = async (req, res, next) => {
    try {
      const profile = await this.usersService.getProfile(req.user.id);
      return ApiResponse.success(res, profile);
    } catch (error) { next(error); }
  };
}

module.exports = { AuthController };
