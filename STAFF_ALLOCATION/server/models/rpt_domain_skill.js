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
const RptDomainSkill = sequelize.define('rpt_domain_skill', {
    key: {
    type: Sequelize.INTEGER,
  },

    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
    
    name: {
    type: Sequelize.STRING(200), 
     allowNull: true,    
  },
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});



//Insert Into DB

// RptDomainSkill.create({ key:112, id:1 , name:"nam_test" ,
// }).then((DBresponse) => {
//     console.log("insert into table role response",DBresponse.dataValues)
//   });




//Fetch All table Data

// RptDomainSkill
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

RptDomainSkill
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


