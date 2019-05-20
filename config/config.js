require('dotenv').config();

const CONFIG={};

CONFIG.port=process.env.PORT||'3000';
CONFIG.db_host=process.env.DB_HOST||'localhost';
CONFIG.db_user=process.env.DB_USER||'postgres';
CONFIG.db_pass=process.env.DB_PASS||'sinsentido';
CONFIG.db_name=process.env.DB_NAME||'pokedex';
CONFIG.db_dialect=process.env.DB_DIALECT||'postgres';

module.exports=CONFIG;