const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=50');
    const pokemonsArr = pokemons.data.results;
    const requests = [];
    const relations = [];
    pokemonsArr.map((pokemon) => {
      requests.push(axios.get(pokemon.url)
        .then((response) => {
          response.data.types.map((type) => {
            let typeUrl = type.type.url;
            let idString = typeUrl.substring(
              typeUrl.lastIndexOf("type/") + 5, typeUrl.length - 1
          );
            let id = parseInt(idString);
            relations.push({
              pokemonId: response.data.id,
              typeId: id,
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

