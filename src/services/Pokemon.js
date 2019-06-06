const PokemonRepository = require('../Respotories/Pokemon');
const PokemonUserModel = require('./../models/PokemonUser');

class PokemonService {

  static async getPokemonsWithTypeAndCatch(userId, _pokemonId){
    const pokemonId= parseInt(_pokemonId);
    if(isNaN(pokemonId)){
      const error = new Error('Invalid params');
      error.code = 400;
      throw error;
    }
    const Catch = await PokemonRepository.getPokemonsWithCatch(userId, pokemonId);
    if(!Catch){
      const error = new Error('Not found!');
      error.code = 404;
      throw error;
    }
    const WithTypes = await PokemonRepository.getPokemonWithTypes(pokemonId);
    if(!WithTypes){
      const error = new Error('Not found!');
      error.code = 404;
      throw error;
    }

    const PokemonsWithTypeAndCatch = {
       details: Catch,
       pokemon: WithTypes
    }

    return PokemonsWithTypeAndCatch;
  }

  static async getPokemonsByName(name) {
    const gettedPokemons = await PokemonRepository.getPokemonsbyName(name);
    return gettedPokemons;
  }

  static async checkPokemon(pokemonId, userId) {
    const gettedPokemons = await PokemonRepository.checkPokemon(pokemonId, userId);
    return gettedPokemons;
  }

  static async addPokemon(userId, _pokemon) {
    const currentTransaction = await PokemonUserModel.sequelize.transaction();
    try {
      const {
        pokemonId, captured,
        locationLatitude, locationLongitude, date,
      } = _pokemon;

      const newPokemon = {
        pokemonId,
        userId,
        captured,
        locationLatitude,
        locationLongitude,
        date,
      };
    const pokemon = await this.checkPokemon(newPokemon.pokemonId, newPokemon.userId);
    if (pokemon) {
        const error = new Error('You have this pokemon!');
        error.code = 409;
        throw error;
      }
      const addedPokemons = await PokemonRepository.addPokemon(newPokemon, currentTransaction);
      currentTransaction.commit();
      return addedPokemons;
    } catch (error) {
      currentTransaction.rollback();
      throw error;
    }
  }
}

module.exports = PokemonService;
