const query = require("../queryDictionary/projectAllocationForCOEQuery")
const db = require('../database/databaseConnect')

function ProjectAllocationForCOE(callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.ProjectAllocationForCOEQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("ProjectAllocationForCOEQuery Data  INSIDE DAO :" ,data)
    callback(data)
  })
}



module.exports = {
	ProjectAllocationForCOE,
}