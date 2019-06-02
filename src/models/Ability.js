const sequelize = require('../../config/sequelize');

const Ability = sequelize.define('Abilities', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.Sequelize.DataTypes.STRING,
  },
  effects: {
    type: sequelize.Sequelize.DataTypes.STRING,
  },

}, {
  tableName: 'Abilities',
});

module.exports = Ability;
