const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await axios.get('https://pokeapi.co/api/v2/type')
      .then((response) => {
        const { results } = response.data;
        const types = [];
        results.map((item) => {
          types.push({ name: item.name });
        });
        return queryInterface.bulkInsert('Types', types, {});
      });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Types', null, {});

  }
};

