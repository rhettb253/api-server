'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const basicAuth = require('./auth/middleware/basicAuth');
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

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
app.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo

app.post('/signin', basicAuth, async (req, res) => {
  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
});

app.use('*', error404);

app.use(error403);

app.use(error500);

module.exports = {app, start};
