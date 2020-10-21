const express = require('express')
const Sequelize = require('sequelize');
const pg = require('pg');
const db = require('../database/databaseConnect')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


function UserInfoModel ()  {

    //connecting to DB
    var sequelize=db.CreateDBConnection();

    //Model
    const UserInfo = sequelize.define('user_info', {

      user_name: {
          type: Sequelize.INTEGER, 
         allowNull: false,  
      },

      user_password: {
        type: Sequelize.STRING ,
        allowNull: false,  

      },

     role: {
        type: Sequelize.STRING(100) ,
        allowNull: false,  
      },

      user_id: {
        type: Sequelize.INTEGER ,
        primaryKey: true,  
        autoIncrement: true
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    });
    return UserInfo

}


//Fetch All table Data
function SelectAllUserInfo(callback) {

    var UserInfo= UserInfoModel();
    UserInfo
      .findAndCountAll()
      .then(result => {
        console.log("Result Count  SelectAllUserInfo ::::",result.count);
        console.log("Result Data  SelectAllUserInfo ::::",result.rows[0].dataValues);
        callback(result.count,result.rows[0].dataValues)
      });
}

//Fetch By Id
function FindByIdUserInfo(getid,callback){

    var UserInfo= UserInfoModel();
    UserInfo
      .findAndCountAll({
         where: {
            user_id: getid
         },
      })
      .then(result => {
        console.log("Result Count  FindByIdAuditDataLog ::::",result.count);
        console.log("Result Data  FindByIdAuditDataLog ::::",result.rows[0].dataValues);
        callback(result.count,result.rows[0].dataValues)
      });
}


module.exports = {
  UserInfoModel,
  SelectAllUserInfo,
  FindByIdUserInfo,

}
