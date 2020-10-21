const express = require('express')
const Sequelize = require('sequelize');
const pg = require('pg');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//Status:not done due to id prioblem at runtime

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
const RptMetrics = sequelize.define('rpt_metrics', {
  // id:{
  //   type: Sequelize.INTEGER,
  //   primaryKey:true,
  //},
    date_key: {
    type: Sequelize.INTEGER,  
  },
      location_key: {
    type: Sequelize.INTEGER,  
  },
      department_key: {
    type: Sequelize.INTEGER,  
  },
      employee_key: {
    type: Sequelize.INTEGER,  
  },
      employee_skill_map_key: {
    type: Sequelize.INTEGER,  
  },
      client_key: {
    type: Sequelize.INTEGER,  
  },
      project_key: {
    type: Sequelize.INTEGER,  
  },
      allocation_key: {
    type: Sequelize.INTEGER,  
  }
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});




// Insert Into DB

RptMetrics.create({ date_key: 12 ,location_key: 2 ,department_key: 3 ,employee_key: 4 ,employee_skill_map_key: 5 ,client_key: 6 ,project_key: 7 ,allocation_key: 8,
}).then((DBresponse) => {
    console.log("insert into table rpt_metrics response",DBresponse.dataValues)
  })




//Fetch All table Data

// RptMetrics
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// Rpt_Metrics
//   .findAndCountAll({
//      where: {
//         date_key: 1
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
