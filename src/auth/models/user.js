'use strict';

// const bcrypt = require('bcrypt');

// Create a Sequelize model
const user = (sequelizeInstance, DataTypes) =>
sequelizeInstance.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  //the code below does not work
  // ,
  // {hooks: {
  //   async beforeCreate() {
  //     console.log('trying to hash the password');
  //     console.log(this.password);
  //     const hashedPW = await bcrypt.hash(this.password, 10);
  //     user.password = hashedPW;
  //     console.log(this.password);
  //   }}
  // }

module.exports = user;