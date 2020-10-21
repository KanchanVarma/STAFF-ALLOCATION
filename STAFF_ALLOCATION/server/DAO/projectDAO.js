const query = require("../queryDictionary/projectQuery")
const query2 = require("../queryDictionary/searchProjectQuery")
const db = require('../database/databaseConnect')

function CreateProject(JsonData,callback) {
	var errorCode = 0;

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.CreateProjectQuery(JsonData), { type: sequelize.QueryTypes.INSERT}).then(data => {
    console.log("CreateProjectQuery Data  INSIDE DAO :" ,data[0][0])
		callback(data[0][0],errorCode,"success")
		
  }).catch(function (err) {
		var errorCode = 1;
		console.log("ERROR .......",err.name,"on field :")
		if (err.name=='SequelizeConnectionError'){
			var message ='Database Connection Failed'
		}
		if (err.name =='SequelizeUniqueConstraintError' && err.errors[0].path=='code') {
			var message = "Project code must be unique"
			} else {
			var message = "Error while craeting new project"
			}

		 callback(err,errorCode,message)
	});
}



function UpdateProject(id,JsonData,callback) {
	var errorCode = 0;
	var sequelize=db.CreateDBConnection();

	sequelize.query(query.UpdateProjectQuery(id,JsonData), { type: sequelize.QueryTypes.UPDATE}).then(data => {
    //console.log("UpdateProjectQuery Data  INSIDE DAO :" ,data)
		callback(data,errorCode,'success')
		
  }).catch(function (err) {
		var errorCode = 1;
		console.log("ERROR .......",err.name,"on field :")
		if (err.name=='SequelizeConnectionError'){
			var message ='Database Connection Failed'
		}
		if (err.name =='SequelizeUniqueConstraintError' && err.errors[0].path=='code') {
			var message = "Project code must be unique"
			} else {
			var message = "Error while modifying project"
			}
		 callback(err,errorCode,message)
	});
}

function SelectProjectById(id,callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.SelectProjectByIdQuery(id), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" SelectResourceByIdQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function SearchProject(jsonData,callback){
  var sequelize=db.CreateDBConnection();

	sequelize.query(query2.SearchProjectsDataQuery(jsonData), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("SearchProjectsDataQuery Data  INSIDE DAO :" ,data)
    callback(data,data.length)
  })
}

module.exports = {
	CreateProject,
	UpdateProject,
	SelectProjectById,
	SearchProject

}
