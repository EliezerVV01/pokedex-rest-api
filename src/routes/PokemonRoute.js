const Router = require('express-promise-router');
const PokemonController = require('../controllers/Pokemon');
const middleware = require('./../middleware/middleware');

class PokemonRoute {
  get router() {
    const router = new Router();
    router.get('/', this.getAllPokemons);
    router.post('/add', middleware.checkToken, this.addPokemon);
    return router;
  }

  async getAllPokemons(req, res) {
    const httpResponse = await PokemonController.getAllByName(req.query.name);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async addPokemon(req, res) {
    const httpResponse = await PokemonController.addPokemon(req);
    return res.status(httpResponse.status).json(httpResponse.body);
  }
}

module.exports = PokemonRoute;
