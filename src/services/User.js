const UserRepository = require('./../Respotories/User');
const UserModel = require('./../models/User');
const UserValidator = require('../utils/validators/User');
const EmailSender = require('./../utils/Email');
const Token = require('./../utils/Token');
const CONFIG = require('./../../config/config');
const bcrypt = require('bcrypt');

class UserService {
  static async getUserByUsername(username) {
    try {
      const gettedUser = await UserRepository.getUserByUsername(username);
      return gettedUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const gettedUser = await UserRepository.getUserByEmail(email);
      return gettedUser;
    } catch (error) {
      throw error;
    }
  }

  static async validateUser(userId) {
    const currentTransaction = await UserModel.sequelize.transaction();
    try {
      const validatedUser = await UserRepository.validateUser(userId, currentTransaction);
      currentTransaction.commit();
      return validatedUser;
    } catch (error) {
      await currentTransaction.rollback();
      throw error;
    }
  }

  static async checkEmail(token) {
    try {
      const decodedToken = Token.verifyToken(token, CONFIG.email_validation_secret);
      const userId = decodedToken.data;
      await this.validateUser(userId);
    } catch (error) {
      throw error;
    }
  }

  static async addUser(user) {
    const userToCreate = user;
    const currentTransaction = await UserModel.sequelize.transaction();
    try {
      if (!UserValidator.validate(userToCreate)) {
        const error = new Error('Adding null to user fields or field no null allow');
        error.code = 400;
        throw error;
      }
      const userWithEmail = await this.getUserByEmail(userToCreate.email);
      if (userWithEmail.id != null) {
        const error = new Error('That email already exists in the database!');
        error.code = 409;
        throw error;
      }

      const userWithUsername = await this.getUserByUsername(userToCreate.userName);
      if (userWithUsername.id != null) {
        const error = new Error('That username already exists in the database!');
        error.code = 409;
        throw error;
      }
      userToCreate.password = await bcrypt.hash(userToCreate.password, 10);
      const pushedUser = await UserRepository.addUser(userToCreate, currentTransaction);
      await currentTransaction.commit();
      const token = Token.generateToken(pushedUser.id, CONFIG.email_validation_secret, 10000);
      EmailSender.sendEmail(pushedUser.email, 'Verify your account', `<p>You need to click the next link to verify your account: ${CONFIG.webapp_link}/${token} </p>`);
      return pushedUser;
    } catch (error) {
      await currentTransaction.rollback();
      throw error;
    }
  }

  static async login(_user) {
    try {
      const user = await UserRepository.login(_user);
      if (user) {
        const match = await bcrypt.compare(_user.password, user.password);
        if (match) {
          const gettedToken = Token.generateToken(user.id, CONFIG.auth_token_secret, 10000);
          const tokenData = {
            token: gettedToken,
          };
          return tokenData;
        }
      }
      const error = new Error('Sorry, but We dont know this user!');
      error.code = 401;
      throw error;
      
    } catch (error) {
      throw error;
    }
  }

  static async getUsers() {
    try {
      const gettedUsers = await UserRepository.getUsers();
      return gettedUsers;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
