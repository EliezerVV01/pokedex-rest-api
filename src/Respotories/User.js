const UserModel = require('./../models/User');
const UserMapper = require('../Domain/mappers/User');
const sequelize = require('./../../config/sequelize');


class UserRepository {

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
