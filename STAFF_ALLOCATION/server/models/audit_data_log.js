const express = require('express')
const Sequelize = require('sequelize');
const pg = require('pg');
const db = require('../database/databaseConnect')
const bodyParser = require('body-parser')
const app = express()


function AuditDataLogModel ()  {

    //connecting to DB
    var sequelize=db.CreateDBConnection();

    //Model
    const AuditDataLog = sequelize.define('audit_data_log', {
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },

      month: {
        type: Sequelize.INTEGER, 
         allowNull: false,
      },

      year: {
        type: Sequelize.INTEGER, 
         allowNull: false, 
      },

      sqldate: {
        type: Sequelize.DATE ,
        allowNull: false, 
      },

      audit_transaction_id: {
          type: Sequelize.INTEGER, 
         allowNull: false,  
      },

      table: {
        type: Sequelize.STRING(100) ,
        allowNull: false,  

      },

     column: {
        type: Sequelize.STRING(100) ,
        allowNull: false,  
      },

      old_value: {
        type: Sequelize.STRING(100) ,
        allowNull: false,  
      },
      new_value: {
        type: Sequelize.STRING(100) ,
        allowNull: false,  
      }
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    });
    return AuditDataLog

}

//Insert Into DB
function InsertAuditDataLog(insertDataJson) {

    var AuditDataLog= AuditDataLogModel();
    AuditDataLog.create({ id: 1 , month: 5 , year: 1, sqldate : new Date() , audit_transaction_id: 1245 ,
    table:"test table" , column: " test column", old_value: "test old value",
    new_value: "test new value",
    }).then((DBresponse) => {
        console.log("insert into table audit_data_log response   ::",DBresponse.dataValues)
    });

}


//Update Into DB by ID
function UpdateAuditDataLog(updateId,updateDataJson) {

    var AuditDataLog= AuditDataLogModel();
    AuditDataLog.update({ id: 1 , month: 6 , year: 1, sqldate : new Date() , audit_transaction_id: 1245 ,
    table:"test table" , column: " test column", old_value: "test old value",
    new_value: "test new value",
    },{
      where :{
        id:updateId
      }
    }
    ).then((DBresponse) => {
        console.log("Update into table audit_data_log response   ::",DBresponse.dataValues)
    });
}


//Fetch All table Data
function SelectAllAuditDataLog(callback) {

    var AuditDataLog= AuditDataLogModel();
    AuditDataLog
      .findAndCountAll()
      .then(result => {
        console.log("Result Count  SelectAllAuditDataLog ::::",result.count);
        console.log("Result Data  SelectAllAuditDataLog ::::",result.rows[0].dataValues);
        callback(result.count,result.rows[0].dataValues)
      });
}

//Fetch By Id
function FindByIdAuditDataLog(getid,callback){

    var AuditDataLog= AuditDataLogModel();
    AuditDataLog
      .findAndCountAll({
         where: {
            id: getid
         },
      })
      .then(result => {
        console.log("Result Count  FindByIdAuditDataLog ::::",result.count);
        console.log("Result Data  FindByIdAuditDataLog ::::",result.rows[0].dataValues);
        callback(result.count,result.rows[0].dataValues)
      });
}


module.exports = {
  AuditDataLogModel,
  InsertAuditDataLog,
  SelectAllAuditDataLog,
  FindByIdAuditDataLog,
  UpdateAuditDataLog,
}
