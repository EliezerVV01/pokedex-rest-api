const Router = require('express-promise-router');
const UserController = require('./../controllers/User');
const middleware = require('./../middleware/middleware');

class UserRoute {
  get router() {
    const router = new Router();
    router.get('/', this.getAllUsers);
    router.post('/', this.createUser);
    router.put('/verifyemail', this.verifyEmail);
    router.post('/login', this.login);
    router.get('/user-pokemons', middleware.checkToken, this.getUserWithPokemons);
    return router;
  }

  async getUserWithPokemons(req, res){
    const { id } = req.decoded.data;
    const httpResponse = await UserController.getUserWithPokemons(id);
    return res.status(httpResponse.status).json(httpResponse.body);
  }


  async createUser(req, res) {
    const httpResponse = await UserController.addUser(req.body.user);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async verifyEmail(req, res) {
    const httpResponse = await UserController.checkEmail(req.body.token);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async login(req, res) {
    const httpResponse = await UserController.login(req.body.user);
    return res.status(httpResponse.status).json(httpResponse.body);
  }


  async getAllUsers(req, res) {
    const httpResponse = await UserController.getAll();
    return res.status(httpResponse.status).json(httpResponse.body);
  }
}


module.exports = UserRoute;
