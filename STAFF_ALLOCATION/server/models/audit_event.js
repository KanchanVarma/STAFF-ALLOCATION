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
const AuditEvent = sequelize.define('audit_event', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

    task_name: {
    type: Sequelize.STRING(100), 
     allowNull: false,
  },

  access_type: {
    type: Sequelize.STRING(100), 
     allowNull: false, 
  },
},

{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});



//Insert Into DB

// AuditEvent.create({ id: 1 , task_name: "test_task" , access_type: "test_access_type" 
// }).then((DBresponse) => {
//     console.log("insert into table audit_data_log response",DBresponse.dataValues)
//   })




//Fetch All table Data

// AuditEvent
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// AuditEvent
//   .findAndCountAll({
//      where: {
//         id: 1
//      },
//   })
//   .then(result => {
//     console.log("Result Count Condition  ::::",result.count);
//     console.log(result.rows);
//   });





// app.get('/', (request, response) => {
//   response.json({ info: 'sequelize API Endpoint' })
// })

// app.listen(port, () => {
//   console.log(`sequelize Service running on ${port}.`)
// })


