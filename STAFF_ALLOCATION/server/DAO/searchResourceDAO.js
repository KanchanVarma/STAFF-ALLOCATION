const query = require("../queryDictionary/searchResourceQuery")

const db = require('../database/databaseConnect')

function SearchResourceData(data,callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.SearchResourceQuery(data), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" SearchResourceQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}


module.exports = {
	// MyProjectsData,
	SearchResourceData,
	//MyResourcesData,
}
