const UserService = require('../services/User');
const Responses = require('./Responses');

class UserController extends Responses {

  static async deleteAccount(userId){
    return UserService.deleteAccount(userId)
               .then(res => this.responseOK({ body: res }))
               .catch(err => this.createErrorResponse(err))
  }

  static async updateProfilePhoto(userId, photoUrl){
    
 return UserService.updateProfilePhoto(userId, photoUrl)
                .then(res => this.responseOK({ body: res }))
                .catch(err => this.createErrorResponse(err))
  }

  static async getUserById(userId){
    return UserService.getUserById(userId)
                .then(response => this.responseOK({ body: response }))
                .catch(err => this.createErrorResponse(err))
  }

  static async updateUser(userId, user){
    return UserService.updateUser(userId, user)
            .then(updatedUser => this.responseOK({body: updatedUser}))
            .catch(err => this.createErrorResponse(err));
  }

  static async getUserByEmail(email){
    return UserService.getUserByEmail(email)
         .then(user => this.responseOK({body: user}))
         .catch(err => this.createErrorResponse(err));
  }
  
  static async getUserWithPokemons(id, name, offset, limit) {
    return UserService.getUserWithPokemons(id, name, offset, limit)
      .then(userWithPokemons => this.responseOK({ body: userWithPokemons }))
      .catch(err => this.createErrorResponse(err));
  }

  static async resetPassword(token, password) {
    return UserService.resetPassword(token, password)
      .then(response => this.responseOK({ body: response }))
      .catch(err => this.createErrorResponse(err));
  }

  static async sendTokenForPass(email) {
    return UserService.sendTokenForPass(email)
      .then(token => this.responseOK({ body: token }))
      .catch(err => this.createErrorResponse(err));
  }

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
