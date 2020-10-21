const express = require('express')
const Sequelize = require('sequelize');
const pg = require('pg');
const bodyParser = require('body-parser')
const app = express()
const port = 3000


//connecting to DB 
const sequelize = new Sequelize('StaffAllocationMain', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: "172.25.8.59",
  port: 5432,
});


//Authenticate Sequilise (if connected or not)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



//Models
const EmployeeSkillMap = sequelize.define('employee_skill_map', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

  employee_id: {
    type: Sequelize.INTEGER,  //foreign key error
     allowNull: false,
  },

  primary_skill_id: {
    type: Sequelize.INTEGER, // foreign key error
     allowNull: false, 
  },
 
 secondary_skill_id: {
    type: Sequelize.INTEGER, // foreign key error
     allowNull: false, 
  },

  status: {
    type: Sequelize.STRING(1) ,
    allowNull: false, 
  },

  created_by_id: {
    type: Sequelize.INTEGER ,
    allowNull: false,  
  },

  created_dtm: {
    type: Sequelize.DATEONLY ,
    allowNull: false,  
  },

  modified_by_id: {
    type: Sequelize.INTEGER ,
    allowNull: false,  
  },

  modified_dtm: {
    type: Sequelize.DATEONLY ,
    allowNull: false,  
  },
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});



//Insert Into DB

EmployeeSkillMap.create({ id: 1 , employee_id: 101 , primary_skill_id: 12,  status : "n", 
created_by_id : 4, created_dtm : new Date(), modified_by_id : 5, modified_dtm: new Date(),
}).then((DBresponse) => {
    console.log("insert into table audit_data_log response",DBresponse.dataValues)
  })




//Fetch All table Data

EmployeeSkillMap
  .findAndCountAll()
  .then(result => {
    console.log("Result Count   ::::",result.count);
    console.log("Table Data  : \n",result.rows);
  });



//Fetch By Condition

EmployeeSkillMap
  .findAndCountAll({
     where: {
        id: 1
     },
  })
  .then(result => {
    console.log("Result Count Condition  ::::",result.count);
    console.log(result.rows);
  });





// app.get('/', (request, response) => {
//   response.json({ info: 'sequelize API Endpoint' })
// })

// app.listen(port, () => {
//   console.log(`sequelize Service running on ${port}.`)
// })


