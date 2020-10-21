const query = require("../queryDictionary/hr_finance_DashboardQuery")
const db = require('../database/databaseConnect')

function HrDashboardData(userId,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.HrDashboardDataQuery(userId), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("HrDashboardDataQuery Data  INSIDE DAO :" ,data)
    callback(data)
  })
}

function FinanceDashboardData(userId,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.FinanceDashboardDataQuery(userId), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("HrDashboardDataQuery Data  INSIDE DAO :" ,data)
    callback(data)
  })
}

module.exports = {
	HrDashboardData,
	FinanceDashboardData,
}
