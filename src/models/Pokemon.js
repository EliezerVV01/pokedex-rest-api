const sequelize = require('../../config/sequelize');

const Type = require('./Type');
const PokemonType = require('./PokemonType');

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

/*Type.belongsToMany(Pokemon, { through: PokemonType });*/


module.exports = Pokemon;
