module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PokemonUser', {
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      captured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      locationLatitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      locationLongitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      time: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PokemonUser');
  },
};
