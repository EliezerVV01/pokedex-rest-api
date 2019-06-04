const PokemonService = require('../services/Pokemon');
const Responses = require('./Responses');

class PokemonController extends Responses {
 
  static async getAllByName(name) {
    return PokemonService.getPokemonsByName(name)
      .then(gettedPokemons => this.responseOK({ body: gettedPokemons }))
      .catch(err => this.createErrorResponse(err));
  }

  static async addPokemon(req){
    return PokemonService.addPokemon(req)
       .then(addedPokemons => this.responseOK({ body: addedPokemons }))
       .catch(err => this.createErrorResponse(err));
  }
}

module.exports = PokemonController;
