const PokemonService = require('../services/Pokemon');
const Responses = require('./Responses');

class PokemonController extends Responses {
 
  static async getAll() {
    return PokemonService.getPokemons()
      .then(gettedPokemons => this.responseOK({ body: gettedPokemons }))
      .catch(err => this.createErrorResponse(err));
  }
}

module.exports = PokemonController;
