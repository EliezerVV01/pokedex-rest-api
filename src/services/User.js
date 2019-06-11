const bcrypt = require('bcrypt');
const UserRepository = require('./../Respotories/User');
const UserModel = require('./../models/User');
const UserValidator = require('../utils/validators/User');
const EmailSender = require('./../utils/Email');
const Token = require('./../utils/Token');
const CONFIG = require('./../../config/config');

class UserService {
  static async getUserWithPokemons(id, name, offset, limit) {
    const gettedUserWithPokemons = await UserRepository.getUserWithPokemons(id, name, offset, limit);
    return gettedUserWithPokemons;

  }

  static async deleteAccount(userId){
    const transaction = await UserModel.sequelize.transaction();
    return await UserRepository.deleteAccount(userId, transaction);
  }

  static async getUserByUsername(username) {
    const gettedUser = await UserRepository.getUserByUsername(username);
    return gettedUser;
  }

  static async getUserByEmail(email) {
    const gettedUser = await UserRepository.getUserByEmail(email);
    return gettedUser;
  }

  static async updateProfilePhoto(userId, photoUrl){
    console.log(userId, photoUrl );
  const currentTransaction = await UserModel.sequelize.transaction();
    try {
      await UserRepository.updateProfilePhoto(userId, photoUrl, currentTransaction);
       currentTransaction.commit();
      const updatedUser = await this.getUserById(userId);
      return updatedUser;
    } catch (error) {
      currentTransaction.rollback();
      throw error;
    }
  }

  static async updateUser(userId, user) {
    const currentTransaction = await UserModel.sequelize.transaction();
    try {
      if (!user) {
        const error = new Error('Missing user object');
        error.code = 400;
        throw error;
      }
      await UserRepository.updateUser(userId, user, currentTransaction);
      currentTransaction.commit();
      const updatedUser = await this.getUserById(userId);
      return updatedUser;
    } catch (error) {
      currentTransaction.rollback();
      throw error;
    }
  }

  static async getUserById(userId) {
    //This method returns the user by the id indicated
    const gettedUser = await UserRepository.getUserById(userId);
    if (!gettedUser.id || !gettedUser) {
      const err = new Error('User not found');
      err.code = 404;
      throw err;
    }
    if(gettedUser.picture){
      let pictureUrl = CONFIG.server_url+'/'+gettedUser.picture;
      gettedUser.picture = pictureUrl;
    }
    return gettedUser;
  }

  static async resetPassword(token, password) {
    //This method take a token, verify it and set the password in the id getted in the token
    const currentTransaction = await UserModel.sequelize.transaction();
    try {
      if (!password) {
        const err = new Error('Password is null, and it cant be');
        err.code = 409;
        return err;
      }
      const decodedToken = Token.verifyToken(token, CONFIG.reset_pass_token_secret);
      const userId = decodedToken.data;
      const passwordHashed = await bcrypt.hash(password, 10);
      const response = await UserRepository.resetPassword(userId, passwordHashed, currentTransaction);
      currentTransaction.commit();
      return response;
    } catch (error) {
      currentTransaction.rollback();
      throw error;
    }


  }

  static async sendTokenForPass(email) {
    //this method create a poken and send it to the email provided
    const user = await this.getUserByEmail(email);
    if (!user.id) {
      const err = new Error("There's no user with that email!");
      err.code = 404;
      throw err;
    }
    const token = Token.generateToken(user.id, CONFIG.reset_pass_token_secret, 10);
    await EmailSender.sendEmail(
      email,
      'Reset password',
      `<p>You need to click the next link to reset your password: ${CONFIG.webapp_link_rest_pass}/${token} </p>`,
    );
    const response = {
      response: 'Great!',
    };
    return response;
  }

  static async validateUser(userId) {
    //This method call use the repository and pass it the id of the user so that a user can be set to validated=true
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
    //This methods recieve a token and get the id of a user from it and call the validate method passing the userId
    const decodedToken = Token.verifyToken(token, CONFIG.email_validation_secret);
    const userId = decodedToken.data;
    await this.validateUser(userId);
  }

  static async addUser(user) {
    //This methods recieve a user and pass it to the repository to created with validated as false by default
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
    //This methods recieve a user with pass and email or user name 
    //and pass it to the login in the repository which check if the email
    // or username provided exists and if its validated then recieve the user getted with the data and 
    // compare it with the password send it in the fist time
    const user = await UserRepository.login(_user);
    if (user) {
      const match = await bcrypt.compare(_user.password, user.password);
      if (match) {
        const gettedToken = Token.generateToken({ id: user.id, name: user.name, email: user.email },
          CONFIG.auth_token_secret, 10000);
        const data = {
          email: user.email,
          token: gettedToken,
        };
        return data;
      }
    }
    const error = new Error('Sorry, but We dont know this user with this password!');
    error.code = 401;
    throw error;
  }

  static async getUsers() {
    const gettedUsers = await UserRepository.getUsers();
    return gettedUsers;
  }
}

module.exports = UserService;
