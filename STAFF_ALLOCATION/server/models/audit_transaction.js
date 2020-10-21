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
const AuditTransaction = sequelize.define('audit_transaction', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },

  audit_event_id: {
    type: Sequelize.INTEGER, 
     allowNull: false,
  },

  month: {
    type: Sequelize.INTEGER, 
     allowNull: false, 
  },

  year: {
    type: Sequelize.INTEGER ,
    allowNull: false, 
  },

  sqldate: {
      type: Sequelize.DATE, 
     allowNull: false,  
  },

  user_id: {
    type: Sequelize.INTEGER ,
    allowNull: false,  

  },

 ip_address: {
    type: Sequelize.STRING(200) ,
    allowNull: false,  
},
},
{
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});



//Insert Into DB

AuditTransaction.create({ id: 1 , audit_event_id: 5 , month: 2, year : 2019 , sqldate: new Date() ,
user_id:10 , ip_address: " 192.168.1.10"
}).then((DBresponse) => {
    console.log("insert into table audit_data_log response",DBresponse.dataValues)
  })




//Fetch All table Data

// AuditTransaction
//   .findAndCountAll()
//   .then(result => {
//     console.log("Result Count   ::::",result.count);
//     console.log("Table Data  : \n",result.rows);
//   });



//Fetch By Condition

// AuditTransaction
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


