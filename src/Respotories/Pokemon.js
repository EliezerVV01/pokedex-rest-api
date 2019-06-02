const PokemonModel = require('../models/Pokemon');
const PokemonWithNameMapper = require('../Domain/mappers/PokemonWithName');

class PokemonRepository {
  static async getPokemons() {
    return PokemonModel.findAll({
      order: [
        ['name', 'ASC'],
      ],
    })
      .then(foundPokemons => foundPokemons.map(pokemon => PokemonWithNameMapper.map(pokemon)))
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = PokemonRepository;
