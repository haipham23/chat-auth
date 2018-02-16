const login = require('../apis/login');
const register = require('../apis/register');
const verify = require('../apis/verify');

const ResponseFactory = require('../factories/response.factory');

const routes = [{
  method: 'get',
  path: '/api/health-check',
  func: (req, res) => ResponseFactory.ok(res, 'ok')
}, {
  method: 'post',
  path: '/api/auth/login',
  func: (req, res) =>
    login(req.body)
      .then(token => ResponseFactory.ok(res, token))
      .catch((error) => ResponseFactory.error(res, error))
}, {
  method: 'post',
  path: '/api/auth/register',
  func: (req, res) =>
    register(req.body)
      .then(token => ResponseFactory.ok(res, 'ok'))
      .catch((error) => ResponseFactory.error(res, error))
}, {
  method: 'get',
  path: '/api/auth/verify/:token/:username',
  func: (req, res) => ResponseFactory.ok(
      res,
      verify({
        token: req.params.token,
        username: req.params.username
      })
    )
}]

module.exports = routes;