const CONFIG = require('./../config/config');

module.exports = {
  development: {
    username: CONFIG.db_user,
    password: CONFIG.db_pass,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
  },
  test: {
    username: CONFIG.db_user,
    password: CONFIG.db_pass,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
  },
  production: {
    username: CONFIG.db_user,
    password: CONFIG.db_pass,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
  }
}
