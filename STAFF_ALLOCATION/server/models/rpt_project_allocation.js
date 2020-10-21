const express = require('express')
const Sequelize = require('sequelize');
const pg = require('pg');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//Status:Completed and Tested with DB

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
const Rpt_Project_Allocation = sequelize.define('rpt_project_allocation', {
    key: {
    type: Sequelize.INTEGER,  
  },

    id: {
    type: Sequelize.INTEGER,
      primaryKey: true,  
  },

  project_key: {
    type: Sequelize.INTEGER, 
  },

  employee_key: {
    type: Sequelize.INTEGER, 
  },

    percentage_allocation: {
    type: Sequelize.INTEGER, 
  },

    billing_reate: {
    type: Sequelize.INTEGER, 
  },

    onsite_offshore: {
    type: Sequelize.STRING(8), 
  },

    location_key: {
    type: Sequelize.INTEGER, 
  },

    doa: {
    type: Sequelize.DATEONLY, 
  },

  status: {
      type: Sequelize.STRING(16),   
  },

  status_date: {
    type: Sequelize.DATEONLY ,
  },

 planned_release_date: {
    type: Sequelize.DATEONLY ,
  }
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});




// Insert Into DB

// Rpt_Project_Allocation.create({ key:45, id: 1 , project_key:121, employee_key:12345 , percentage_allocation: 95,
// billing_reate:45667, onsite_offshore: "Test", location_key: 192, doa:new Date(), status:"Test_Status", 
// status_date: new Date(), planned_release_date : new Date(),
// }).then((DBresponse) => {
//     console.log("insert into table secondary_skill response",DBresponse.dataValues)
//   })




//Fetch All table Data

// Rpt_Project_Allocation
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// Rpt_Project_Allocation
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



