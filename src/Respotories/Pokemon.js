const PokemonModel = require('../models/Pokemon');
const PokemonUserModel = require('./../models/PokemonUser');
const PokemonWithNameMapper = require('../Domain/mappers/PokemonWithName');
const sequelize = require('./../../config/sequelize');

class PokemonRepository {

  static async checkPokemon(pokemonId, userEmail) {
    return PokemonUserModel.findOne({
      where: {
        pokemonId: pokemonId,
        userEmail: userEmail,
      },
    })
      .then(foundPokemon => (foundPokemon ? foundPokemon.dataValues : null))
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async getPokemonsbyName(name) {
    const Op = sequelize.Op;
    return PokemonModel.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      },
      order: [
        ['name', 'ASC'],
      ],
    })
      .then(foundPokemons => foundPokemons.map(pokemon => PokemonWithNameMapper.map(pokemon)))
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async addPokemon(pokemon, transaction) {
    return PokemonUserModel.create(pokemon, { transaction })
      .then((addedPokemon) => {
        const {
          pokemonId, userEmail, captured,
          locationLatitude, locationLongitude, date,
        } = addedPokemon;

        const pokemonMaped = {
          pokemonId,
          userEmail,
          captured,
          locationLatitude,
          locationLongitude,
          date,
        };
        return pokemonMaped;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = PokemonRepository;
