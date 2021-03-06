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
const PrimarySkill = sequelize.define('primary_skill', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING(200), 
     allowNull: false,
  },

  status: {
    type: Sequelize.STRING(1), 
     allowNull: false, 
  },

  created_by_id: {
    type: Sequelize.INTEGER ,
    allowNull: false, 
  },

  created_dtm: {
      type: Sequelize.DATE, 
     allowNull: false,  
  },

  modified_by_id: {
    type: Sequelize.INTEGER ,
    allowNull: false,  

  },

 modified_dtm: {
    type: Sequelize.DATE ,
    allowNull: false,  
},
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});



//Insert Into DB

// PrimarySkill.create({ id: 1 , name: "test_skill" , status: "Y", created_by_id : 123 , created_dtm: new Date() ,
// modified_by_id: 1234 , modified_dtm:  new Date(),
// }).then((DBresponse) => {
//     console.log("insert into table audit_data_log response",DBresponse.dataValues)
//   });




//Fetch All table Data

// PrimarySkill
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

PrimarySkill
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


