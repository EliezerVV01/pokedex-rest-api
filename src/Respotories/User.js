const UserModel = require('./../models/User');
const UserMapper = require('../Domain/mappers/User');

class UserRepository {
  static async getUserByUsername(_username) {
    try {
      return UserModel.findOne({ where: { userName: _username } })
        .then(foundUser => UserMapper.map(foundUser))
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(_email) {
    try {
      return UserModel.findOne({ where: { email: _email } })
        .then(foundUser => UserMapper.map(foundUser))
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      throw error;
    }
  }


  static async addUser(user, transaction) {
    try {
      return UserModel.create(user, { transaction })
        .then(createdUser => UserMapper.map(createdUser))
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      throw error;
    }
  }

  static async validateUser(userId, transaction) {
    try {
      return UserModel.update(
        { validated: true }, { where: { id: userId } }, { transaction },
      ).then((_, updatedUser) => UserMapper.map(updatedUser))
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      throw error;
    }
  }

  static async getUsers() {
    try {
      return UserModel.findAll()
        .then(foundUsers => foundUsers.map(user => UserMapper.map(user)))
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
