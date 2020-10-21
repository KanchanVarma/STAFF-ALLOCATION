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
const Employee = sequelize.define('employee', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

  code: {
    type: Sequelize.STRING(10), 
     allowNull: false,
  },

  name: {
    type: Sequelize.STRING(40), 
     allowNull: false, 
  },

  designation: {
    type: Sequelize.STRING(30) ,
    allowNull: false, 
  },

  grade: {
      type: Sequelize.STRING(30), 
     allowNull: false,  
  },

  gender: {
    type: Sequelize.STRING(30) ,
    allowNull: false,  

  },

 doj: {
    type: Sequelize.DATEONLY ,
    allowNull: false,  
},

  dob: {
    type: Sequelize.DATEONLY ,
    allowNull: false,  
  },
  education: {
    type: Sequelize.STRING(30) ,
    allowNull: false,  
  },
  certification:{
    type:sequelize.STRING(150),
    allowNull:false,
  },
  total_experience:{
    type: sequelize.INTEGER,
  },
  relevant_experience:{
    type:sequelize.INTEGER,
  },
  email_id:{
    type:sequelize.STRING(30),
  },
  contact: {
    type: Sequelize.STRING(30) ,  
  },
  status: {
    type: Sequelize.STRING(1) ,
    allowNull: false,  
  },
  employment_status: {
    type: Sequelize.STRING(18) ,
    allowNull: false,  
  },
  std_billing_rate: {
    type: Sequelize.INTEGER ,
    allowNull: false,  
  },
  min_billing_rate: {
    type: Sequelize.INTEGER ,
    allowNull: false,  
  },
  average_billing_rate: {
    type: Sequelize.INTEGER ,
    allowNull: false,  
  },
  location_id: {                             //foreign key error
    type: Sequelize.INTEGER ,
  },
  recruiters_name: {
    type: Sequelize.STRING(40) ,  
  },
  exit_date: {
    type: Sequelize.DATEONLY ,
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

Employee.create({ id: 1 , code: "e101" , name: "bob", designation : "project manager" , grade: "A" ,
gender:"male" , doj: new Date(), dob: new Date(), education: "MBA", certification: "java",
total_experience: 4, relevant_experience: 2, email_id : "bob123@gmail.com", contact : 8390884250 , status : "n", employment_status : "employed", std_billing_rate : 50,
min_billing_rate : 2 , average_billing_rate : 20, location_id : 11, recruiters_name : "recruitement_team", exit_date : new Date(),
created_by_id : 4, created_dtm : new Date(), modified_by_id : 5, modified_dtm: new Date(),
}).then((DBresponse) => {
    console.log("insert into table audit_data_log response",DBresponse.dataValues)
  })




//Fetch All table Data

Employee
  .findAndCountAll()
  .then(result => {
    console.log("Result Count   ::::",result.count);
    console.log("Table Data  : \n",result.rows);
  });



//Fetch By Condition

Employee
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


