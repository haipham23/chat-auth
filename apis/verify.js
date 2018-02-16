const jwt = require('jsonwebtoken');

const verify = data => {
  try {
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
    return decoded.data === data.username;
  } catch (e) {
    return false;
  }
};

module.exports = verify;