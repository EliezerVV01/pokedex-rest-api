const sequelize = require('../../config/sequelize');

const PokemonUser = sequelize.define('PokemonUser', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pokemonId: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pokemons',
      key: 'id',
    },
  },
  userId: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  captured: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  locationLatitude: {
    type: sequelize.Sequelize.DataTypes.FLOAT,
    allowNull: true,
  },
  locationLongitude: {
    type: sequelize.Sequelize.DataTypes.FLOAT,
    allowNull: true,
  },
  time: {
    type: sequelize.Sequelize.DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: sequelize.Sequelize.DataTypes.NOW,
  },

}, { tableName: 'PokemonUser' });

module.exports = PokemonUser;
