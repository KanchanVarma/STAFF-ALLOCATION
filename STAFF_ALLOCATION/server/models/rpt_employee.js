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
const RptEmployee = sequelize.define('rpt_employee', {
    key: {
    type: Sequelize.INTEGER,
  },
    id: {
    type: Sequelize.INTEGER,
    
  },

  code: {
    type: Sequelize.STRING(10), 
     
  },

  name: {
    type: Sequelize.STRING(40), 
      
  },

  designation: {
    type: Sequelize.STRING(30) ,
     
  },

  grade: {
      type: Sequelize.STRING(30), 
       
  },

  gender: {
    type: Sequelize.STRING(30) ,
     

  },

 doj: {
    type: Sequelize.DATEONLY ,
     
},

  dob: {
    type: Sequelize.DATEONLY ,
      
  },
  education: {
    type: Sequelize.STRING(30) ,
      
  },
  
  certification:{
    type: Sequelize.STRING(150),
    
  },

  total_experience:{
    type: Sequelize.INTEGER,
  },

  relevant_experience:{
    type:Sequelize.INTEGER,
  },

  email_id:{
    type: Sequelize.STRING(30),
  },

  contact: {
    type: Sequelize.STRING(30) ,  
  },
    
  employment_status: {
    type: Sequelize.STRING(18) ,
     
  },
  std_billing_rate: {
    type: Sequelize.INTEGER ,
     
  },
  min_billing_rate: {
    type: Sequelize.INTEGER ,
      
  },
  average_billing_rate: {
    type: Sequelize.INTEGER ,
     
  },
  location_key: {
    type: Sequelize.INTEGER ,
  },
  recruiters_name: {
    type: Sequelize.STRING(40) ,  
  },

  hr_spoc: {
    type: Sequelize.STRING(40),
    primaryKey: true,
  },

  exit_date: {
    type: Sequelize.DATEONLY ,
    allowNull: false,  
  },
  },
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});



//Insert Into DB

RptEmployee.create({ key : 1 , id: 1 , code: "e102" , name: "john", designation : "project manager" , grade: "A" ,
gender:"male" , doj: new Date(), dob: new Date(), education: "engineer", certification: "java",
total_experience: 3, relevant_experience: 2, email_id : "john12@gmail.com", contact : 8388557710 , employment_status : "employed", std_billing_rate : 50 ,
min_billing_rate : 2 , average_billing_rate : 20, location_key : 10, recruiters_name : "recruitment_team", hr_spoc: "B" ,exit_date : new Date(),
}).then((DBresponse) => {
    console.log("insert into table audit_data_log response",DBresponse.dataValues)
  })




//Fetch All table Data

// RptEmployee
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// RptEmployee
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


