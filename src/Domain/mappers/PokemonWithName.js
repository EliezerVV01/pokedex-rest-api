const PokemonWithNameDTO = require('../DTO/pokemonWithNameDTO.js');

class PokemonWithNameMapper {
  static map(model) {
    const pokemonWithNameDTO = new PokemonWithNameDTO();

    if (model != null && model.dataValues != null && model.dataValues.id != null) {
      pokemonWithNameDTO.id = model.dataValues.id;
      pokemonWithNameDTO.name = model.dataValues.name;
      pokemonWithNameDTO.picture = model.dataValues.picture;
    }

    return pokemonWithNameDTO;
  }
}

module.exports = PokemonWithNameMapper;
