const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=50');
    const pokemonsArr = pokemons.data.results;
    const requests = [];
    const relations = [];
    pokemonsArr.map((item) => {
      requests.push(axios.get(item.url)
        .then((response) => {
          response.data.types.map((type) => {
            relations.push({
              pokemonId: response.data.id,
              typeName: type.type.name,
            });
          });
        }));
    });
    await axios.all(requests)
      .catch(err => console.log(err));
    return queryInterface.bulkInsert('PokemonType', relations, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('PokemonType', null, {});

  }
};

