const PokemonService = require('../services/Pokemon');
const Responses = require('./Responses');

class PokemonController extends Responses {

  static async getPokemonsWithTypeAndCatch(userId, pokemonId){
    return PokemonService.getPokemonsWithTypeAndCatch(userId, pokemonId)
        .then(gettedPokemons => this.responseOK({ body: gettedPokemons}))
        .catch(err => this.createErrorResponse(err));
  }
 
  static async getAllByName(name) {
    return PokemonService.getPokemonsByName(name)
      .then(gettedPokemons => this.responseOK({ body: gettedPokemons }))
      .catch(err => this.createErrorResponse(err));
  }

  static async addPokemon(userId, pokemon){
   return PokemonService.addPokemon(userId, pokemon)
       .then(addedPokemons => this.responseOK({ body: addedPokemons }))
       .catch(err => this.createErrorResponse(err));
  }
}

module.exports = PokemonController;
