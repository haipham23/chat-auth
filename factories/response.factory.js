const logger = require('winston');

const ResponseFactory = {
  ok: (res, result) => res.status(200).json(result),
  error: (res, error) => {
    logger.error(error);

    return res.status(400).json('SERVER_ERROR');
  }
};

module.exports = ResponseFactory;