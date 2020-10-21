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
const ProjectAllocation = sequelize.define('project_allocation', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

    project_id: {
    type: Sequelize.INTEGER, 
     allowNull: false,
  },

    employee_id: {
    type: Sequelize.STRING(1), 
     allowNull: true, 
  },

    percentage_allocation: {
    type: Sequelize.REAL ,
    allowNull: false, 
  },

    billing_rate: {
      type: Sequelize.REAL, 
     allowNull: false,  
  },

    onsite_offshore: {
    type: Sequelize.STRING(8) ,
    allowNull: false,  

  },

   location_id: {
    type: Sequelize.INTEGER ,
    allowNull: false,  
},
   doa: {
    type: Sequelize.DATE ,
    allowNull: false,  
},
   status: {
    type: Sequelize.STRING(16) ,
    allowNull: false,  
},
   status_date: {
    type: Sequelize.DATE ,
    allowNull: false,  
},
  planned_release_date: {
    type: Sequelize.DATE ,
    allowNull: false,  
},
  remark: {
    type: Sequelize.STRING(250) ,
    allowNull: false,  
},
  created_by_id: {
    type: Sequelize.INTEGER ,
    allowNull: true, 
  },

  modified_by_id: {
    type: Sequelize.INTEGER ,
    allowNull: false,  

  },

 modified_date: {
    type: Sequelize.DATE ,
    allowNull: false,  
},
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});



//Insert Into DB

// ProjectAllocation.create({ id: 1 , project_id: 123 , employee_id: 321, percentage_allocation:75.5  ,billing_rate:34.43  ,onsite_offshore:"onsite",
// location_id:2019  ,doa:new Date(),status:"status_test", status_date:new Date(), planned_release_date:new Date(),remark:"remark_test" ,created_by_id : 123 ,
// modified_by_id: 1234 , modified_date:  new Date(),
// }).then((DBresponse) => {
//     console.log("insert into table audit_data_log response",DBresponse.dataValues)
//   });




//Fetch All table Data

// ProjectAllocation
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// ProjectAllocation
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


