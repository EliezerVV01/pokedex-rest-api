const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const sequelize = require('./../config/sequelize');
const config = require('./../config/config');


/*  Testing connection to the db  */ 
sequelize
  .authenticate()
  .then(() => {
    console.log('Done');
    console.log(`Connection has been established successfully for database:  ${config.db_name}  `);
  })
  .catch(err => {
    console.error(`Unable to connect to the database: ${config.db_name}`, err);
  });

app.use(function(req, res, next) {
  console.log('Got the request');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(routes);

const port = config.port;

app.listen(port, () =>
  console.log(`API listening on port http://${config.host}:${port}`),
);