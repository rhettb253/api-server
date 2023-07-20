'use strict';

// 3rd Party Resources
require('dotenv').config();
const {sequelize} = require('./src/auth/models/index.model');
const {start} = require('./src/server');

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    start(process.env.PORT);
  }).catch(e => {
    console.error('Could not start server', e.message);
  });