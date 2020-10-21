const query = require("../queryDictionary/deliveryDashboardQueries")
const db = require('../database/databaseConnect')

function MyProjectsData(user_id,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.MyProjectsDataQuery(user_id), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("MyProjectsDataQuery Data  INSIDE DAO :" ,data)
    callback(data)
  })
}

function MyResourcesData(user_id,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.MyResourcesDataQuery(user_id), { type: sequelize.QueryTypes.SELECT}).then(data => {
   // console.log("My ResourcesData Data  INSIDE DAO :" ,data)
    callback(data)
  })
}

function NewProjectData(user_id,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.NewProjectDataQuery(user_id), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("My NewProjectData  INSIDE DAO :" ,data)
    callback(data)
  })
}

function ProjectClosingIn15DaysData(user_id,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.ProjectClosingIn15DaysDataQuery(user_id), { type: sequelize.QueryTypes.SELECT}).then(data => {
   // console.log("My ProjectClosingIn15DaysData  INSIDE DAO :" ,data)
    callback(data)
  })
}


function ResourceReleasingIn15DaysData(user_id,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.ResourceReleasingIn15DaysDataQuery(user_id), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("My ResourceReleasingIn15DaysData  INSIDE DAO :" ,data)
    callback(data)
  })
}

function ProjectStartingIn15DaysData(user_id,callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.ProjectStartingIn15DaysDataQuery(user_id), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("My ProjectStartingIn15DaysData  INSIDE DAO :" ,data)
    callback(data)
  })
}
function ResourceCalenderData(callback) {

	var sequelize=db.CreateDBConnection();

	sequelize.query(query.ResourceCalenderDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
    //console.log("My ResourceCalenderData  INSIDE DAO :" ,data)
    callback(data)
  })
}

module.exports = {
	MyProjectsData,
	MyResourcesData,
	NewProjectData,
	ProjectClosingIn15DaysData,
	ResourceReleasingIn15DaysData,
  ProjectStartingIn15DaysData,
  ResourceCalenderData
}
