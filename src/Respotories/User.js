const UserModel = require('./../models/User');
const UserMapper = require('../Domain/mappers/User');
const sequelize = require('./../../config/sequelize');
const PokemonModel = require('./../models/Pokemon');
require('../models/relations');


class UserRepository {
  static async getUserWithPokemons(_id) {
    return UserModel.findOne({
      include: [{
        model: PokemonModel,
        as: 'pokemons',
        required: false,
        attributes: ['id', 'name', 'picture'],
        through: { attributes: [] },
      }],
      where: {
        id: _id,
      },
    }).then(foundUser => {
      if (!foundUser.dataValues) foundUser
      const userWithPokemon = foundUser.dataValues;
      const { id, userName, firstName, lastName, email, gender, address, birthDate, picture, pokemons } = userWithPokemon;
      const userWithPokemonMapped = {
        id, userName, firstName, lastName, email, gender, address, birthDate, picture, pokemons,
      };
      return userWithPokemonMapped;
    })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }

  static async getUserByUsername(_username) {
    return UserModel.findOne({ where: { userName: _username } })
      .then(foundUser => UserMapper.map(foundUser))
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async getUserByEmail(_email) {
    return UserModel.findOne({ where: { email: _email } })
      .then(foundUser => UserMapper.map(foundUser))
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async updateUser(userId, user, transaction){
   await UserModel.update(user, 
      { where: { id : userId,} , transaction  }
      ).then(response => response)
      .catch(err => {throw err});
  
  }

  static async getUserById(userId){
    return UserModel.findOne({
       where: {
         id : userId,
       }
     }).then(gettedUser => UserMapper.map(gettedUser))
        .catch(err => { throw err });
  }

  static async addUser(user, transaction) {
    return UserModel.create(user, { transaction })
      .then(createdUser => UserMapper.map(createdUser))
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async validateUser(userId, transaction) {
    return UserModel.update(
      { validated: true }, { where: { id: userId } }, { transaction },
    ).then((_, updatedUser) => UserMapper.map(updatedUser))
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async resetPassword(userId, _password, transaction) {
    return UserModel.update(
      { password: _password }, { where: { id: userId }, returning: true, plain: true }, { transaction },
    ).then((_, updatedUser) => UserMapper.map(updatedUser))
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async login(user) {
    const Op = sequelize.Op;
    return UserModel.findOne({
      where:
      {
        validated: true,
        [Op.or]: [{ email: user.user },
        { userName: user.user }]
      }
    })
      .then(gettedUser => gettedUser)
      .catch((err) => {
        throw new Error(err);
      });
  }

  static async getUsers() {
    return UserModel.findAll()
      .then(foundUsers => foundUsers.map(user => UserMapper.map(user)))
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = UserRepository;
