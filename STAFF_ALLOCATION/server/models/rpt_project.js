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
const Rpt_Project = sequelize.define('rpt_project', {
    key: {
    type: Sequelize.INTEGER,
    allowNull: false,     
  },

    id: {
    type: Sequelize.INTEGER,
      primaryKey: true,  
  },

  code: {
    type: Sequelize.STRING(10), 
  },

  name: {
    type: Sequelize.STRING(100), 
  },

  description: {
    type: Sequelize.STRING(300), 
  },

  location_key: {
    type: Sequelize.INTEGER, 
  },

  manager: {
    type: Sequelize.STRING(40), 
  },

  client_key: {
    type: Sequelize.INTEGER, 
  },

  department_key: {
    type: Sequelize.INTEGER, 
  },

  start_date: {
    type: Sequelize.DATEONLY, 
  },

  end_date: {
    type: Sequelize.DATEONLY, 
  },

  billing_start_date: {
      type: Sequelize.DATEONLY,   
  },

  billing_end_date: {
    type: Sequelize.DATEONLY ,
  },

 billing_type: {
    type: Sequelize.STRING(10) ,
  },
   project_value: {
    type: Sequelize.INTEGER ,
  },
   currentcy: {
    type: Sequelize.STRING(3) ,
  },
   account_owner: {
    type: Sequelize.STRING(40) ,
  },
   delivery_owner: {
    type: Sequelize.STRING(40) ,
  },
    finance_owner: {
    type: Sequelize.STRING(40) ,
  },
    nature: {
    type: Sequelize.STRING(5) ,
  }
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});




// Insert Into DB

// Rpt_Project.create({ key:45, id: 1 , code:"Test_Code",name:"Test_Name", description:"Test_Description" , location_key: 95,
// manager:"Test_Manager", client_key: 4032, department_key: 192, start_date:new Date(), end_date:new Date, 
// billing_start_date: new Date(), billing_end_date : new Date(),billing_type:"Test_Type", project_value:45000,
// currentcy:"Tst", account_owner:"Test_Owner", delivery_owner:"Test_DelvOwner",
// finance_owner:"Test_FinanOwner", nature : "Test"
// }).then((DBresponse) => {
//     console.log("insert into table secondary_skill response",DBresponse.dataValues)
//   })




//Fetch All table Data

// Rpt_Project
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// Rpt_Project
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



