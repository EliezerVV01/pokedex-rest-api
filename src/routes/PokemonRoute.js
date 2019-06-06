const Router = require('express-promise-router');
const PokemonController = require('../controllers/Pokemon');
const middleware = require('./../middleware/middleware');

class PokemonRoute {
  get router() {
    const router = new Router();
    router.get('/', this.getAllPokemons);
    router.post('/', middleware.checkToken, this.addPokemon);
    router.get('/:id', middleware.checkToken, this.getPokemonsWithTypeAndCatch);
    return router;
  }

  async getPokemonsWithTypeAndCatch(req, res){
    const userId = req.decoded.data.id;
    const pokemonId = req.params.id;
    const httpResponse = await PokemonController.getPokemonsWithTypeAndCatch(userId, pokemonId);
    return res.status(httpResponse.status).json(httpResponse.body);

  }

  async getAllPokemons(req, res) {
    const httpResponse = await PokemonController.getAllByName(req.query.name);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async addPokemon(req, res) {
    const userId = req.decoded.data.id;
    const pokemon = req.body.pokemon;
   const httpResponse = await PokemonController.addPokemon(userId, pokemon);
    return res.status(httpResponse.status).json(httpResponse.body);
  }
}

module.exports = PokemonRoute;
