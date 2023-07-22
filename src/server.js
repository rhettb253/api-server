'use strict';

const express = require('express');
const signUpAndInRoutes = require('./auth/router');
const error404 = require('./middleware/404');
const error403 = require('./middleware/403')
const error500 = require('./middleware/500');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

//start function
function start(port) {
    app.listen(port, console.log("I am listening on " + port))
};

app.use('/', signUpAndInRoutes);

app.use('*', error404);

app.use(error403);

app.use(error500);

module.exports = {app, start};
