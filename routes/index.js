const rp = require('chat-rp');

const login = require('../apis/login');
const register = require('../apis/register');
const verify = require('../apis/verify');

const routes = [{
  method: 'get',
  path: '/api/health-check',
  func: (req, res) => rp.ok(res, 'ok')
}, {
  method: 'post',
  path: '/api/auth/login',
  func: (req, res) =>
    login(req.body)
      .then(token => rp.ok(res, token))
      .catch((error) => rp.error(res, error))
}, {
  method: 'post',
  path: '/api/auth/register',
  func: (req, res) =>
    register(req.body)
      .then(token => rp.ok(res, 'ok'))
      .catch((error) => rp.error(res, error))
}, {
  method: 'get',
  path: '/api/auth/verify/:token/:username',
  func: (req, res) => rp.ok(
      res,
      verify({
        token: req.params.token,
        username: req.params.username
      })
    )
}]

module.exports = routes;