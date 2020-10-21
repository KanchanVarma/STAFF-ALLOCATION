const query = require("../queryDictionary/resourceQuery")
const db = require('../database/databaseConnect')

function CreateResource(JsonData, callback) {
console.log("*****************************************",JsonData)
	var sequelize = db.CreateDBConnection();
	var errorCode = 0;

	sequelize.query(query.CreateResourceQuery(JsonData), { type: sequelize.QueryTypes.INSERT }).then(data1 => {
	//	console.log("CreateResourceQuery Data  INSIDE DAO :", data1)

		sequelize.query(query.InsertEmployeeSkillMapQuery(data1[0][0].id,JsonData), { type: sequelize.QueryTypes.INSERT }).then(data2 => {
			//console.log("InsertEmployeeSkillMapQuery Data  INSIDE DAO :", data2)
			callback(data1,errorCode,'success')
		})
}).catch(function (err) {
	var errorCode = 1;
	console.log("ERROR .......",err.name,"on field :")
	if (err.name =='SequelizeUniqueConstraintError' && err.errors[0].path=='code') {
		var message = "Employee code must be unique"
	  } else {
		var message = "Error while craeting new employee"
	  }
   callback(err,errorCode,message)
});
}

function UpdateResource(id, JsonData, callback) {

	var sequelize = db.CreateDBConnection();
	var errorCode = 0;
	sequelize.query(query.UpdateResourceQuery(id, JsonData), { type: sequelize.QueryTypes.UPDATE }).then(data => {
	//console.log(" UpdateResourceQuery Data  INSIDE DAO : ",data)
		sequelize.query(query.UpdateEmployeeSkillMapQuery(id,JsonData), { type: sequelize.QueryTypes.UPDATE }).then(data2 => {
		console.log("JsonData.exit_date  :",JsonData.exit_date)
		sequelize.query(query.UpdateAllocationOnExitQuery(id,JsonData), { type: sequelize.QueryTypes.UPDATE }).then(data => {
			callback(data,errorCode,'success')
		})
		})
	}).catch(function (err) {
		var errorCode = 1;
		console.log("ERROR .......",err.name,"on field :",err)
		if (err.name =='SequelizeUniqueConstraintError' && err.errors[0].path=='code') {
			var message = "Employee code must be unique"
		  } else {
			var message = "Error while modifying employee details"
		  }
	   callback(err,errorCode,message)
	});
}

function SelectResourceById(id, callback) {
	var sequelize = db.CreateDBConnection();
	sequelize.query(query.SelectResourceByIdQuery(id), { type: sequelize.QueryTypes.SELECT }).then(data => {
		console.log("SelectResourceByIdQuery Data INSIDE DAO :", data)
		callback(data)
	})
}

module.exports = {
	CreateResource,
	UpdateResource,
	SelectResourceById,
}
