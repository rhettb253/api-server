'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const user = require('./user');

//conneect to the db
const sequelize = new Sequelize(process.env.DATABASE_URL);

//call functions to make models
let User = user(sequelize, DataTypes);

module.exports = { User, sequelize };

// const testDbConnection = async () => {
// try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// testDbConnection();