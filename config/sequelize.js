const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('pokedex', 'postgres', 'sinsentido', {
  host: 'localhost',
  dialect: 'postgres'
});
