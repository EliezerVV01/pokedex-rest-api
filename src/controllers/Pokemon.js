const PokemonService = require('../services/Pokemon');
const Responses = require('./Responses');

class PokemonController extends Responses {

  static async deletePokemon(userId, pokemonId) {
    return PokemonService.deletePokemon(userId, pokemonId)
      .then(gettedPokemons => this.responseOK({ body: gettedPokemons }))
      .catch(err => this.createErrorResponse(err));
  }

  static async editPokemonCatch(pokemonUser, userId, pokemonId) {
    return PokemonService.editPokemonCatch(pokemonUser, userId, pokemonId)
      .then(gettedPokemons => this.responseOK({ body: gettedPokemons }))
      .catch(err => this.createErrorResponse(err));
  }

  static async getPokemonsWithTypeAndCatch(userId, pokemonId) {
    return PokemonService.getPokemonsWithTypeAndCatch(userId, pokemonId)
      .then(gettedPokemons => this.responseOK({ body: gettedPokemons }))
      .catch(err => this.createErrorResponse(err));
  }

  static async getAllByName(name) {
    return PokemonService.getPokemonsByName(name)
      .then(gettedPokemons => this.responseOK({ body: gettedPokemons }))
      .catch(err => this.createErrorResponse(err));
  }

  static async addPokemon(userId, pokemon) {
    return PokemonService.addPokemon(userId, pokemon)
      .then(addedPokemons => this.responseOK({ body: addedPokemons }))
      .catch(err => this.createErrorResponse(err));
  }
}

module.exports = PokemonController;
