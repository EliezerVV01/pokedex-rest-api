const Router = require('express-promise-router');
const PokemonController = require('../controllers/Pokemon');

class PokemonRoute {
  get router() {
    const router = new Router();
    router.get('/', this.getAllPokemons);
    return router;
  }

  async getAllPokemons(req, res) {
    const httpResponse = await PokemonController.getAll();
    return res.status(httpResponse.status).json(httpResponse.body);
  }
}

module.exports = PokemonRoute;
