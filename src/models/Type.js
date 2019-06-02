const sequelize = require('../../config/sequelize');

const Pokemon = require('./Pokemon');
const PokemonType = require('./PokemonType');

const Type = sequelize.define('Type', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.Sequelize.DataTypes.STRING,
  },
}, { tableName: 'Types' });

//Type.belongsToMany(Pokemon, { through: PokemonType });


module.exports = Type;
