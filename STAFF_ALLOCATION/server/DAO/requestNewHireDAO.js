const query = require("../queryDictionary/requestNewHireQuery")
const db = require('../database/databaseConnect')



function InsertRequestNewHire(JsonData,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.InsertRequestNewHireQuery(JsonData), { type: sequelize.QueryTypes.INSERT}).then(data => {
    //console.log("InsertRequestNewHireQuery Data  INSIDE DAO :" ,data)
    callback(data)
  })
}


function UpdateRequestNewHire(JsonData,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.UpdateRequestNewHireQuery(JsonData), { type: sequelize.QueryTypes.UPDATE}).then(data => {
    //console.log("UpdateRequestNewHireQuery Data  INSIDE DAO :" ,data)
    callback(data)
  })
}


function SelectRequestNewHireById(id,callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.SelectRequestNewHireQuery(id), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" SelectRequestNewHireQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}


module.exports = {
	InsertRequestNewHire,
	UpdateRequestNewHire,
	SelectRequestNewHireById,
}
