const sequelize = require('../../config/sequelize');

const PokemonType = sequelize.define('PokemonType', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pokemonId: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Pokemons',
      key: 'id',
    },
  },
  typeId: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Types',
      key: 'id',
    },
  },

}, { tableName: 'PokemonType' });


module.exports = PokemonType;
