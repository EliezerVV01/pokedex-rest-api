const sequelize = require('../../config/sequelize');

const PokemonType = sequelize.define('PokemonType', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pokemonName: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Pokemons',
      key: 'name',
    },
  },
  typeName: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Types',
      key: 'name',
    },
  },

}, { tableName: 'PokemonType' });


module.exports = PokemonType;
