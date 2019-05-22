const UserDTO = require('./../DTO/userDTO.js');

class UserMapper {
  static map(model) {
    const userDTO = new UserDTO();

    if (model != null && model.dataValues.id != null) {
      userDTO.id = model.dataValues.id;
      userDTO.userName = model.dataValues.userName;
      userDTO.firstName = model.dataValues.firstName;
      userDTO.lastName = model.dataValues.lastName;
      userDTO.email = model.dataValues.email;
      userDTO.gender = model.dataValues.gender;
      userDTO.address = model.dataValues.address;
      userDTO.birthDate = model.dataValues.birthDate;
      userDTO.picture = model.dataValues.picture;
      userDTO.validated = model.dataValues.validated;
    }

    return userDTO;
  }
}

module.exports = UserMapper;
