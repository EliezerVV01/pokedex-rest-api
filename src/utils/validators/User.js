class UserValidator {
  static validate(user) {
    if (!user.userName || !user.password || !user.firstName
      || !user.lastName || !user.email || !user.gender || !user.address
      || !user.birthDate) {
      return false;
    }
    return true;
  }
}
module.exports = UserValidator;
