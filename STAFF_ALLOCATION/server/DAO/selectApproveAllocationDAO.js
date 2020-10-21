const query = require("../queryDictionary/selectApproveAllocationQuery")

const db = require('../database/databaseConnect')

function SelectProjectAllocationData(id,callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.SelectProjectAllocationQuery(id), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" SelectProjectAllocationQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}


module.exports = {
SelectProjectAllocationData,
}
