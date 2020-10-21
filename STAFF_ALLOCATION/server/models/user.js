const express = require('express')
const Sequelize = require('sequelize');
const pg = require('pg');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//Status:Incomplete due to foreign key

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
const User = sequelize.define('user', {
    id: {
    type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,  
  },

  name: {
    type: Sequelize.STRING(40), 
    allowNull: true,
  },

    email: {
    type: Sequelize.STRING(40),
    allowNull: true,  
  },

  password: {
    type: Sequelize.STRING(40), 
     allowNull: false, 
  },

  role_id: {
    type: Sequelize.INTEGER ,
    allowNull: false, 
  },

  status: {
      type: Sequelize.STRING(1), 
     allowNull: true,  
  },

  created_by_id: {
    type: Sequelize.INTEGER ,
    allowNull: false,  

  },

 created_timestamp: {
    type: Sequelize.DATEONLY ,
    allowNull: false,  
  },

  modified_by_id: {
    type: Sequelize.INTEGER ,
    allowNull: true,  
  },
  modified_date: {
    type: Sequelize.DATEONLY ,
    allowNull: true,  
  },
    user_pkey: {
    type: Sequelize.DATEONLY ,
    allowNull: true,
    primaryKey: true,  
  },
    modified_date: {
    type: Sequelize.DATEONLY ,
    allowNull: true,  
  }
  //   modified_date: {
  //   type: Sequelize.DATEONLY ,
  //   allowNull: true, 
  // }
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});



//Insert Into DB

// User.create({ id: 1 , name: 5 , email: 1, password : new Date() , role_id: 1245 ,
// status:"test table" , created_by_id: " test column", created_timestamp: "test old value",
// modified_by_id: "test new value",modified_date: "test new value",user_pkey: "test new value",
// }).then((DBresponse) => {
//     console.log("insert into table user response",DBresponse.dataValues)
//   })




//Fetch All table Data

// User
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// User
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



