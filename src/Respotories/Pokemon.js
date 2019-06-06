const PokemonModel = require('../models/Pokemon');
const TypeModel = require('../models/Type');
const PokemonUserModel = require('./../models/PokemonUser');
const PokemonWithNameMapper = require('../Domain/mappers/PokemonWithName');
const sequelize = require('./../../config/sequelize');
require('../models/relations');

class PokemonRepository {
  static async checkPokemon(pokemonId, userId) {
    return PokemonUserModel.findOne({
      where: {
        pokemonId: pokemonId,
        userId: userId,
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

  static async getPokemonWithTypes(_pokemonId){
    return PokemonModel.findOne({
      include: [{
        model: TypeModel,
        as: 'types',
        required: false,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      }],
      where: {
        id: _pokemonId,
      },
    })
    .then((foundPokemonWithTypes)=>{
      if(!foundPokemonWithTypes){
         return foundPokemonWithTypes;
      }
      const {id, name, height, wight, picture, baseExperience, types} = foundPokemonWithTypes;
      const foundPokemonWithTypesMapped = {
        id, name, height, wight, picture, baseExperience, types
      }
      return foundPokemonWithTypesMapped;
    })
    .catch((err) => {
      throw new Error(err);
    });
  }

  static async getPokemonsWithCatch(_userId, _pokemonId){
      return PokemonUserModel.findOne({
        where: {
          pokemonId: _pokemonId,
          userId: _userId
        }
      }).then((gettedPokemon) =>{
        if(!gettedPokemon){
          return gettedPokemon;
        }
          const {
            id, pokemonId, userId, captured, locationLatitude, locationLongitude, date
          } = gettedPokemon;

          const pokemonMaped = {
            id, pokemonId, userId, captured,
             locationLatitude, locationLongitude,
              date
          }

          return pokemonMaped;
      }).catch(err =>{ throw new Error(err)});
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
