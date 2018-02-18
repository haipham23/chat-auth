const UserModel = require('../models/user.model');

const isExist = (query) => {
  return UserModel
    .find({ username: query.username })
    .then((docs) => docs.length > 0);
};

module.exports = isExist;