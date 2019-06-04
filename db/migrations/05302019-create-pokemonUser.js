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
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'email',
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
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PokemonUser');
  },
};
