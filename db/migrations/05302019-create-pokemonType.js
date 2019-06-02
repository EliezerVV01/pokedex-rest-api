module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PokemonType', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pokemonName: {
        type: Sequelize.STRING(100),
        references: {
          model: 'Pokemons',
          key: 'name',
        },
        allowNull: false,
      },
      typeName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        references: {
          model: 'Types',
          key: 'name',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PokemonType');
  },
};
