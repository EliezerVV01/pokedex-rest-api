const PokemonRepository = require('../Respotories/Pokemon');
const PokemonModel = require('../models/Pokemon');

class PokemonService {
  static async getPokemonsByName(name) {
    const gettedPokemons = await PokemonRepository.getPokemonsbyName(name);
    return gettedPokemons;
  }

  static async addPokemon(req) {
    const currentTransaction = await PokemonModel.sequelize.transaction();
    try {
      const {
        pokemonId, userEmail, captured,
        locationLatitude, locationLongitude, date,
      } = req.body.pokemon;

      const newPokemon = {
        pokemonId,
        userEmail,
        captured,
        locationLatitude,
        locationLongitude,
        date,
      };
      const pokemon = await this.getPokemonsByName(newPokemon.name);
      if (!pokemon.pokemonId) {
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
