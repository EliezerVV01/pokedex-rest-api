const sequelize = require('../../config/sequelize');
const User = require('./User');

const Pokemon = sequelize.define('Pokemon', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  height: {
    type: sequelize.Sequelize.DataTypes.FLOAT,
  },
  weight: {
    type: sequelize.Sequelize.DataTypes.FLOAT,
  },
  picture: {
    type: sequelize.Sequelize.DataTypes.STRING,
  },
  baseExperience: {
    type: sequelize.Sequelize.DataTypes.STRING,
  },

}, { tableName: 'Pokemons' });

module.exports = Pokemon;
