'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {User} = require('../models/index.model');

const basicAuth = async (req, res, next) => {
    let {authorization} = req.headers;
    console.log('auth string', authorization);
    //should give us something that looks like: 'Basic UnlhbjpwYXNzMTIz'
    
    //we want to split Basic away from the encoded part
    let encodedStr = authorization.split(' ')[1];
    //console.log(encodedStr);
    
    // now we decode the encoded string
    let decodedStr = base64.decode(encodedStr);
    //should give us: 'username:password'
    
    //we want: ["username", "password"]
    const [username, password] = decodedStr.split(':');
    console.log({ username, password });

    //find the User instance that has the same username
    let account = await User.findOne({where: {username: username}});
    if (account) {
        console.log(`We found ${account.username}`);
    } else {
        next('No account found under this username.');
    };

    // compare the password to the encrypted pw saved in the user's account we just got
    let isValid = await bcrypt.compare(password, account.password);
    if (isValid) {
        req.user = account;
        next();
    } else {
        const err = new Error('Not authorized, incorrect password.');
        err.status = 403;
        next(err);
    };
};

module.exports = basicAuth;