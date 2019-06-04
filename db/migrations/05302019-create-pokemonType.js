module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PokemonType', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pokemonId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pokemons',
          key: 'id',
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
