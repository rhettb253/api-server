'use strict';

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
  },
  {hooks: {
    beforeCreate() {
      console.log('still need to hash the password');
      // hash the plain text password before we save a user to the db
    }}
  });

module.exports = user;