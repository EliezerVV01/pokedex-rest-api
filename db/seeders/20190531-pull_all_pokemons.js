const axios = require('axios');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=50');
    const pokemonsArr = pokemons.data.results;
    const requests = [];
    const pokemonsList = [];
    pokemonsArr.map((item) => {
      requests.push(axios.get(item.url)
        .then((response) => {
          pokemonsList.push({
            id: response.data.id,
            name: response.data.name,
            height: response.data.height,
            weight: response.data.weight,
            picture: response.data.sprites.front_default,
            baseExperience: response.data.base_experience,
          });
        }));
    });
    await axios.all(requests)
      .catch(err => console.log(err));

    return queryInterface.bulkInsert('Pokemons', pokemonsList, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Pokemons', null, {});

  }
};

