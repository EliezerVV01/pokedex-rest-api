const User = require('./User');
const Pokemon = require('./Pokemon');
const Type = require('./Type');
const PokemonUser = require('./PokemonUser');

//Pokemon and User relationship many to many

User.belongsToMany(Pokemon, {
  through: 'PokemonUser',
  as: 'pokemons',
  foreignKey: 'userId',
  targetKey: 'id',
});

Pokemon.belongsToMany(User, {
  through: 'PokemonUser',
  as: 'users',
  foreignKey: 'pokemonId',
  targetKey: 'id',
});

//Pokemon and Type relationship many to many

Type.belongsToMany(Pokemon, {
  through: 'PokemonType',
  as: 'pokemons',
  foreignKey: 'typeId',
  targetKey: 'id'
});

Pokemon.belongsToMany(Type, {
  through: 'PokemonType',
  as: 'types',
  foreignKey: 'pokemonId',
  targetKey: 'id'
});