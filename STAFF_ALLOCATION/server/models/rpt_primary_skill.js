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
const Rpt_Primary_Skill = sequelize.define('rpt_primary_skill', {
    key: {
    type: Sequelize.INTEGER,  
  },

    id: {
    type: Sequelize.INTEGER,  
    primaryKey:true,
  },

  name: {
    type: Sequelize.STRING(200), 
    allowNull: false,
  }
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});




// Insert Into DB

// Rpt_Primary_Skill.create({ key: 123 ,id: 1 , name: "test_name",
// }).then((DBresponse) => {
//     console.log("insert into table rpt_secondary_skill response",DBresponse.dataValues)
//   })




//Fetch All table Data

// Rpt_Primary_Skill
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// Rpt_Primary_Skill
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



