const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');

const login = data =>
  UserModel.findOne({ username: data.username })
    .then((user) => {
      if (!user || !user.comparePassword(data.password)) {
        return Promise.reject(new Error('INVALID_USER'));
      }

      const token = jwt.sign(
        {
          data: user.username
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '12h'
        }
      );

      return Promise.resolve(token);
    });

module.exports = login;
