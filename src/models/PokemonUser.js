const sequelize = require('../../config/sequelize');

const PokemonUser = sequelize.define('PokemonUser', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pokemonId: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    references: {
      model: 'Pokemon',
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
    type: sequelize.Sequelize.DataTypes.STRING,
    references: {
      model: 'User',
      key: 'id',
    },
    allowNull: false,
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
  date: {
    type: sequelize.Sequelize.DataTypes.DATEONLY,
    allowNull: false,
  },

}, { tableName: 'PokemonUser' });

module.exports = PokemonUser;
