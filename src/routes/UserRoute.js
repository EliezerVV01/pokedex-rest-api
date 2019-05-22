const Router = require('express-promise-router');
const UserController = require('./../controllers/User');

class UserRoute {
  get router() {
    const router = new Router();
    router.get('/', this.getAllUsers);
    router.post('/create', this.createUser);
    router.post('/verifyemail', this.verifyEmail);
    return router;
  }

  async createUser(req, res) {
    const httpResponse = await UserController.addUser(req.body.user);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async verifyEmail(req, res) {
    const httpResponse = await UserController.checkEmail(req.body.token);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async getAllUsers(res) {
    const httpResponse = await UserController.getAll();
    return res.status(httpResponse.status).json(httpResponse.body);
  }
}


module.exports = UserRoute;
