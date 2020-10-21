const query = require("../queryDictionary/searchAllocationReportQuery")

const db = require('../database/databaseConnect')

function SearchAllocationReport(jsonData,callback) {

	var sequelize=db.CreateDBConnection();
	sequelize.query(query.SearchAllocationReportQuery(jsonData), { type: sequelize.QueryTypes.SELECT}).then(data => {
	 // console.log("SearchAllocationReportQuery Query Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}


module.exports = {
SearchAllocationReport,
}
