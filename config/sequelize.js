const Sequelize = require('sequelize');
const config = require('./config');


const sequelize = new Sequelize(config.db_name, config.db_user, config.db_pass, {
  host: config.db_host,
  dialect: config.db_dialect,
  operatosAliases: false
});

module.exports=sequelize;
