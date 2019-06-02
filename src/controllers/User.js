const UserService = require('../services/User');
const Responses = require('./Responses');

class UserController extends Responses {
  static async addUser(user) {
    return UserService.addUser(user)
      .then(addedUser => this.responseOK({ body: addedUser }))
      .catch(err => this.createErrorResponse(err));
  }

  static async checkEmail(token) {
    return UserService.checkEmail(token)
      .then(response => this.responseOK({ body: response }))
      .catch(err => this.createErrorResponse(err));
  }

  static async login(user) {
    return UserService.login(user)
      .then(token => this.responseOK({ body: token }))
      .catch(err => this.createErrorResponse(err));
  }


  static async getAll() {
    return UserService.getUsers()
      .then(gettedUsers => this.responseOK({ body: gettedUsers }))
      .catch(err => this.createErrorResponse(err));
  }
}

module.exports = UserController;
