const PokemonRepository = require('../Respotories/Pokemon');

class PokemonService {
  static async getPokemons() {
    try {
      const gettedPokemons = await PokemonRepository.getPokemons();
      return gettedPokemons;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PokemonService;
