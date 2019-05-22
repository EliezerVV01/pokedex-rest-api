require('dotenv').config();

const CONFIG = {};

CONFIG.port = process.env.PORT || '3000';

//  DB config

CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_user = process.env.DB_USER || 'postgres';
CONFIG.db_pass = process.env.DB_PASS || 'sinsentido';
CONFIG.db_name = process.env.DB_NAME || 'pokedex';
CONFIG.db_dialect = process.env.DB_DIALECT || 'postgres';

//  Email config

CONFIG.email_service = process.env.EMAIL_SERVICE || 'google';
CONFIG.email_user = process.env.EMAIL_USER;
CONFIG.email_pass = process.env.EMAIL_PASS;
CONFIG.email_validation_secret = process.env.EMAIL_VALIDATION_SECRET;


module.exports = CONFIG;
