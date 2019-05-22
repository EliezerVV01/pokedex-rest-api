
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userName: 'first user',
      password: 'cool',
      firstName: 'The guy',
      lastName: 'good',
      email: 'coolguy@gmail.com',
      gender: true,
      address: 'He lives over there',
      birthDate: '18/5/2015',
      validated: false,
    }], {})
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
