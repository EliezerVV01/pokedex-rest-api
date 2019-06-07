const Router = require('express-promise-router');
const UserController = require('./../controllers/User');
const middleware = require('./../middleware/middleware');

class UserRoute {
  get router() {
    const router = new Router();
    router.get('/user-pokemons', middleware.checkToken, this.getUserWithPokemons);
    router.get('/getUser', middleware.checkToken, this.getUser);
    router.post('/', this.createUser);
    router.post('/login', this.login);
    router.post('/tokenpassword', this.sendTokenForPass);
    router.put('/resetpassword', this.resetPassword);
    router.put('/verifyemail', this.verifyEmail)
    router.put('/updateuser', middleware.checkToken, this.updateUser);

    return router;
  }

  async updateUser(req, res) {
    const { id } = req.decoded.data;
    const user = req.body.user;
    
    const httpResponse = await UserController.updateUser(id, user);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async getUser(req, res) {
    const { id } = req.decoded.data;
    const httpResponse = await UserController.getUserById(id);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async resetPassword(req, res) {
    const token = req.body.token;
    const password = req.body.password;
    console.log(token, password);
    const httpResponse = await UserController.resetPassword(token, password);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async sendTokenForPass(req, res) {
    const email = req.body.email;
    const httpResponse = await UserController.sendTokenForPass(email);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async getUserWithPokemons(req, res) {
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
