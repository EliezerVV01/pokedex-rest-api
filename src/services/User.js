const bcrypt = require('bcrypt');
const UserRepository = require('./../Respotories/User');
const UserModel = require('./../models/User');
const UserValidator = require('../utils/validators/User');
const EmailSender = require('./../utils/Email');
const Token = require('./../utils/Token');
const CONFIG = require('./../../config/config');

class UserService {
  static async getUserWithPokemons(id) {
    const gettedUserWithPokemons = await UserRepository.getUserWithPokemons(id);
    return gettedUserWithPokemons;

  }

  static async getUserByUsername(username) {
    const gettedUser = await UserRepository.getUserByUsername(username);
    return gettedUser;
  }

  static async getUserByEmail(email) {
    const gettedUser = await UserRepository.getUserByEmail(email);
    return gettedUser;
  }

  static async sendTokenForPass(email) {
    const user = await this.getUserByEmail;
    if (!user.id) {
      const err = new Error("There's no user with that email!");
      err.code = 404;
      throw err;
    }
    const token = Token.generateToken(user.id, CONFIG.reset_pass_token_secret, 10);
    await EmailSender.sendEmail(
      email,
      'Reset password',
      `<p>You need to click the next link to reset your password: ${CONFIG.webapp_link}/${token} </p>`,
    );
    const response = {
      token,
    };
    return response;
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
    const decodedToken = Token.verifyToken(token, CONFIG.email_validation_secret);
    const userId = decodedToken.data;
    await this.validateUser(userId);
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
      const token = Token.generateToken(pushedUser.id, CONFIG.email_validation_secret, 15);
      EmailSender.sendEmail(pushedUser.email, 'Verify your account', `<p>You need to click the next link to verify your account: ${CONFIG.webapp_link}/${token} </p>`);
      await currentTransaction.commit();
      return pushedUser;
    } catch (error) {
      await currentTransaction.rollback();
      throw error;
    }
  }

  static async login(_user) {
    const user = await UserRepository.login(_user);
    if (user) {
      const match = await bcrypt.compare(_user.password, user.password);
      if (match) {
        const gettedToken = Token.generateToken({ id: user.id, name: user.name, email: user.email },
          CONFIG.auth_token_secret, 10000);
        const tokenData = {
          token: gettedToken,
        };
        return tokenData;
      }
    }
    const error = new Error('Sorry, but We dont know this user!');
    error.code = 401;
    throw error;
  }

  static async getUsers() {
    const gettedUsers = await UserRepository.getUsers();
    return gettedUsers;
  }
}

module.exports = UserService;
