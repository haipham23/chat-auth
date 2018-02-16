const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Missing Username']
  },
  password: {
    type: String,
    required: [true, 'Missing Password']
  }
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err2, hash) {
      if (err2) {
        return next(err2);
      }

      user.password = hash;

      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};


UserSchema.plugin(timestamps);

module.exports = mongoose.model('User', UserSchema);
