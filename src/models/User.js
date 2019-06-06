const sequelize = require('./../../config/sequelize');
const Pokemon = require('./Pokemon');

const User = sequelize.define('User', {
  id: {
    type: sequelize.Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  gender: {
    type: sequelize.Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
  },
  address: {
    type: sequelize.Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
  },
  birthDate: {
    type: sequelize.Sequelize.DataTypes.DATE,
    allowNull: false,
  },
  picture: {
    type: sequelize.Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  validated: {
    type: sequelize.Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

}, { tableName: 'Users' });



module.exports = User;
