const query = require("../queryDictionary/loginQuery")
const db = require('../database/databaseConnect')

function LoginData(jsonData,callback) {

	var sequelize=db.CreateDBConnection();
  var errorCode = 0;
	sequelize.query(query.loginQuery(jsonData.userName), { type: sequelize.QueryTypes.SELECT}).then(data => {
    console.log("Login Data  INSIDE DAO :" ,data)
    console.log("Login Json Data  INSIDE DAO :" ,jsonData)
    callback(data,errorCode,'success')
  }).catch(function (err) {
		var errorCode = 1;
		console.log("ERROR .......",err.name,"on field :",err)
		if (err.name=='SequelizeConnectionError'){
			var message ='Database Connection Failed'
		} else {
      var message ='Incorrect Credentials'
    }

		 callback(err,errorCode,message)
	});
}

function LoginUserData(userName,callback) {

	var sequelize=db.CreateDBConnection();
  var errorCode = 0;
	sequelize.query(query.loginADQuery(userName), { type: sequelize.QueryTypes.SELECT}).then(data => {
    console.log("Login Data  INSIDE DAO :" ,data)
		console.log("Login Json Data  INSIDE DAO :" ,userName)
		if(data.length>0)
			callback(data,errorCode,'success')
		else
			callback(data,1,'User Not Found')
  }).catch(function (err) {
		var errorCode = 1;
		console.log("ERROR .......",err.name,"on field :",err)
		if (err.name=='SequelizeConnectionError'){
			var message ='Database Connection Failed'
		} else {
      var message ='Incorrect Credentials'
    }

		 callback(err,errorCode,message)
	});
}



module.exports = {
	LoginData,
	LoginUserData
}
