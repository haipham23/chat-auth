const jwt = require('jsonwebtoken');
const logger = require('winston');

const UserModel = require('../models/user.model');

const login = data =>
  UserModel.findOne({ username: data.username })
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }

      return user.comparePassword(data.password);
    })
    .then((isMatch) => {
      if(!isMatch) {
        return Promise.reject();
      }

      return jwt.sign(
        {
          data: data.username
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '12h'
        }
      );
    })
    .catch((e) => {
      logger.error(e);

      return Promise.reject(new Error('INVALID_USER'));
    });

module.exports = login;
