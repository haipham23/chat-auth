const UserModel = require('../models/user.model');

const register = data => (new UserModel(data)).save();

module.exports = register;