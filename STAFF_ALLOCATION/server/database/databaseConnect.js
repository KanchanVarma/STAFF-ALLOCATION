const express = require('express')
const Sequelize = require('sequelize');
const pg = require('pg');

const bodyParser = require('body-parser')
const app = express()
const port = 3000



function CreateDBConnection() {

//connecting to DB 
const sequelize = new Sequelize(
   process.env.DB_DATABASE, 
   process.env.DB_USER, 
   process.env.DB_PASSWORD, {
   dialect: 'postgres',
   host:  process.env.DB_HOST,
   port: process.env.DB_PORT,
   pool: {
   max: 5,
   min: 0,
   idle: 1000
  }
});
//console.log("database Connection ",sequelize)

//Authenticate Sequilise (if connected or not)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  return sequelize

}


module.exports = {
  CreateDBConnection,
}
