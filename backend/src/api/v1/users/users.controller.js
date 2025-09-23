const { ApiResponse } = require('../../../utils/apiResponse');
const { UsersService } = require('./users.service');

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  getProfile = async (req, res, next) => {
    try {
      const profile = await this.usersService.getProfile(req.user.id);
      return ApiResponse.success(res, profile);
    } catch (error) { next(error); }
  };

  updateProfile = async (req, res, next) => {
    try {
      const updated = await this.usersService.updateProfile(req.user.id, req.body);
      return ApiResponse.success(res, updated, 'Profile updated');
    } catch (error) { next(error); }
  };

  getById = async (req, res, next) => {
    try {
      const user = await this.usersService.getById(req.params.id);
      if (!user) return ApiResponse.notFound(res, 'User not found');
      return ApiResponse.success(res, user);
    } catch (error) { next(error); }
  };
}

module.exports = { UsersController };


