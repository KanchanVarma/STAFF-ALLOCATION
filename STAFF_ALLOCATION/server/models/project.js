const express = require('express')
const Sequelize = require('sequelize');
const pg = require('pg');
const db = require('../database/databaseConnect')
const bodyParser = require('body-parser')
const app = express()


function ProjectModel() {

      //connecting to DB
    var sequelize=db.CreateDBConnection();

    //Models
    const Project = sequelize.define('project', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
        code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100), 
         allowNull: false,
      },

      description: {
        type: Sequelize.STRING(300), 
         allowNull: false, 
      },

      location_id: {
        type: Sequelize.INTEGER ,
        allowNull: false, 
        foreignKey:true, 
      },

      manager: {
          type: Sequelize.STRING(40), 
         allowNull: false,  
      },

      client_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        foreignKey:true,  

      },

     department_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        foreignKey:true,   
    },
     start_date: {
        type: Sequelize.DATE ,
        allowNull: false,  
    },
     end_date: {
        type: Sequelize.DATE ,
        allowNull: false,  
    },
      billing_start_date: {
        type: Sequelize.DATE ,
        allowNull: false,  
    },
        billing_end_date: {
        type: Sequelize.DATE ,
        allowNull: false,
    },  
      billing_type: {
        type: Sequelize.STRING(10) ,
        allowNull: false,  
    },
      project_value: {
        type: Sequelize.INTEGER ,
        allowNull: false,  
    },
      currency: {
        type: Sequelize.STRING(3) ,
        allowNull: false,  
    },
       account_owner: {
        type: Sequelize.STRING(40) ,
        allowNull: false,  
    },
      delivery_owner: {
        type: Sequelize.STRING(40) ,
        allowNull: false,  
    },
      finance_owner: {
        type: Sequelize.STRING(40) ,
        allowNull: false,  
    },
      nature: {
        type: Sequelize.STRING(5) ,
        allowNull: false,  
    },
      status: {
        type: Sequelize.STRING(1) ,
        allowNull: false,  
    },
    nature: {
        type: Sequelize.STRING(5) ,
        allowNull: false,  
    },
      created_by_id: {
        type: Sequelize.INTEGER ,
        allowNull: false, 
      },

      created_dtm: {
          type: Sequelize.DATE, 
         allowNull: false,  
      },

      modified_by_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,  

      },

     modified_dtm: {
        type: Sequelize.DATE ,
        allowNull: false,  
    },
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    });

    return Project
}


module.exports = {
  ProjectModel,
}
