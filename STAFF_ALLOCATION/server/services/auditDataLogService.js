var store = require('store')
const Pool = require('pg').Pool
var moment = require('moment')
require('dotenv').config()
const query = require("../queryDictionary/auditDataLogQuery")
const db = require('../database/databaseConnect')

function InsertAuditTransection(audit_event_id , month , year , sqldate , user_id , ip_address,callback){

	var sequelize=db.CreateDBConnection();
	
	sequelize.query(query.InsertAuditTracsactionQuery(audit_event_id , month , year , sqldate , user_id , ip_address), { type: sequelize.QueryTypes.INSERT}).then(data => {
		console.log("InsertAuditTracsactionQuery Data  INSIDE DAO :" ,data)
		callback(data)
  })

}




const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})


function AuditTracker (month , year , sqldate , audit_transaction_id , table , column ,old_value , new_value){

  var childTableName ="audit_data_log_" + moment().format('YYYY_MM_DD')
    console.log("childTableName   ",childTableName)

  var after= moment(new Date()).add(1,'days').format('YYYY_MM_DD')
    console.log("after  day   ",after)


//check if table exists
  console.log("checking if table exixts  ")

  pool.query(`SELECT EXISTS ( SELECT 1 FROM   information_schema.tables 
       WHERE  table_schema = 'public' AND    table_name = $1 );`,[childTableName], (error, results) => {
      if (error) {
        throw error
      }

      queryResponse=results.rows[0].exists
      console.log("if table Exists queryResponse: ",queryResponse)

      if(queryResponse===false){
          console.log("creating table with name :",childTableName)
          var createTableQuery = `CREATE TABLE `+ childTableName +` PARTITION OF audit_data_log_master
          FOR VALUES FROM ('`+moment().format('YYYY_MM_DD')+`') TO ('`+after+`');`

          pool.query(createTableQuery, (error, results) => {
          if (error) {
             throw error
           }
          console.log(" table created with name :",childTableName)
         })

      }
      if (queryResponse===true){
          console.log("table already exists with table name ::",childTableName)
      } 
      pool.query(`INSERT INTO audit_data_log_master(month,year,sqldate,audit_transaction_id,"table","column",old_value,new_value) VALUES 
        ($1,$2,$3,$4,$5,$6,$7,$8);`,[month , year , sqldate , audit_transaction_id , table , column ,old_value , new_value], (error, results) => {
      if (error) {
        throw error
      }
      console.log("inserting audit values into table   ::", childTableName)
      }) 
  })

}

module.exports= {
	InsertAuditTransection,
	AuditTracker,
}