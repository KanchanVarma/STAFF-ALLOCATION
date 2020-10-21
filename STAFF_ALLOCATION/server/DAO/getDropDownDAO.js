const query = require("../queryDictionary/getDropDownQuery")
const db = require('../database/databaseConnect')


function GetLocationDataByArea(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetLocationDataByAreaQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" GetLocationDataByAreaQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function GetLocationDataByCity(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetLocationDataByCityQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	 // console.log(" GetLocationDataByCityQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function GetLocationDataByCountry(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetLocationDataByCountryQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	//  console.log(" GetLocationDataByCountryQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function GetDepartmentData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetDepartmentDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" GetDepartmentDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function GetClientData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetClientDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	 // console.log(" GetClientDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function GetPrimarySkillData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetPrimarySkillDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" GetPrimarySkillDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function GetSecondarySkillData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetSecondarySkillDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" GetSecondarySkillQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function GetDomainData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetDomainDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" GetDomainDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function GetRmgProjectData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.GetRmgProjectDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" GetRmgProjectDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}



//////////////   USER DROPDOWN STARTS FORM HERE  ///////////////////////////////



function ProjectManagerNameData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.ProjectManagerNameDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" ProjectManagerNameDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function AccountOwnerNameData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.AccountOwnerNameDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	 // console.log(" AccountOwnerNameDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function DeliveryOwnerNameData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.DeliveryOwnerNameDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" DeliveryOwnerNameDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function FinanceOwnerNameData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.FinanceOwnerNameDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" FinanceOwnerNameDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}


function RMGNameData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.RMGNameDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" RMGNameDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}

function HRNameData(callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.HRNameDataQuery(), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" HRNameDataQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}




/////////////////////////////////   PROJECT PER MANAGER   /////////////////////////////////


function ProjectPerManager(id,callback) {
	var sequelize=db.CreateDBConnection();
	sequelize.query(query.ProjectPerManagerQuery(id), { type: sequelize.QueryTypes.SELECT}).then(data => {
	  //console.log(" ProjectPerManagerQuery Data  INSIDE DAO :" ,data)
	  callback(data)
	  })
}


module.exports = {
	
	GetLocationDataByArea,
	GetLocationDataByCity,
	GetLocationDataByCountry,
	GetDepartmentData,
	GetClientData,
	GetPrimarySkillData,
	GetSecondarySkillData,
	GetDomainData,
	GetRmgProjectData,
	ProjectManagerNameData,
	AccountOwnerNameData,
	DeliveryOwnerNameData,
	FinanceOwnerNameData,
	RMGNameData,
	HRNameData,
	ProjectPerManager
}