const sequelize = require('../../config/sequelize');

const Move = sequelize.define('Moves', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.Sequelize.DataTypes.STRING,
  },
}, { tableName: 'Moves' });

module.exports = Move;
