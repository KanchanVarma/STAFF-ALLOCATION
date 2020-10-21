
const query = require("../queryDictionary/camundaRequestQuery")
const db = require('../database/databaseConnect')
//const model = require("../models/project")



function InsertCamundaRequest(tableInsertData,callback) {

	var sequelize=db.CreateDBConnection();
	sequelize.query(query.InsertCamundaRequestQuery(tableInsertData), { type: sequelize.QueryTypes.INSERT}).then(data => {
		console.log("InsertCamundaRequestQuery Data  INSIDE DAO :" ,data);
		callback(data)
  })
}


function UpdateCamundaRequest(process_instance_id,task_id,status,callback) {

	var sequelize=db.CreateDBConnection();
	sequelize.query(query.UpdateCamundaRequestQuery(process_instance_id,task_id,status), { type: sequelize.QueryTypes.UPDATE}).then(data => {
		console.log("UpdateCamundaRequestQuery Data  INSIDE DAO :" ,data);
		callback(data)
  })
}


module.exports = {
	InsertCamundaRequest,
	UpdateCamundaRequest,
}
