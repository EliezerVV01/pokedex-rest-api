class UserDTO {
  constructor(id, userName,
    firstName, lastName, email, gender,
    address, birthDate, picture, activated) {
    this.id = id;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.address = address;
    this.birthDate = birthDate;
    this.picture = picture;
    this.activated = activated;
  }
}

module.exports = UserDTO;
