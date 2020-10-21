const query = require("../queryDictionary/allocationDetailsQuery")

const db = require('../database/databaseConnect')

function AllocationDetailsForProject(id,callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.AllocationDetailsForProjectQuery(id), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" AllocationDetailsForProject Query Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function AllocationDetailsForResource(id,callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.AllocationDetailsForResourceQuery(id), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" AllocationDetailsForResource Query Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}


module.exports = {
AllocationDetailsForProject,
AllocationDetailsForResource,
}
