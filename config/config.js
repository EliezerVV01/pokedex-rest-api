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
CONFIG.email_validation_secret = process.env.EMAIL_VALIDATION_SECRET || 'shh';

//WebApp Config

CONFIG.webapp_link = process.env.WEBAPP_LINK || 'http://localhost:3000/validate';

//Auth config
CONFIG.auth_token_secret = process.env.AUTH_TOKEN_SECRET || 'shhh';

//Reset config
CONFIG.reset_pass_token_secret = process.env.RESET_PASS_TOKEN_SECRET || 'shhhh';

module.exports = CONFIG;
