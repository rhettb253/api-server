'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const basicAuth = require('../auth/middleware/basicAuth');
const { User } = require('../auth/models/index.model');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newAccount = await User.create(req.body);
      res.status(201).json(newAccount);
    } catch (e) {
      res.status(403).send('Error Creating User');
    }
  });
  
  // Signin Route -- login with username and password
  // test with httpie
  // http post :3000/signin -a john:foo
  router.post('/signin', basicAuth, async (req, res) => {
    try {
        res.status(200).json(req.user);
      }
    catch (error) {
      next(error)
    }
  });

module.exports = router;