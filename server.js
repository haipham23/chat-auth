require('dotenv').config();

const GenericService = require('chat-ms');

const routes = require('./routes');

const auth = new GenericService({
  routes,
  port: 8080,
  mongoUrl: process.env.MONGO_URL
});

auth.init();