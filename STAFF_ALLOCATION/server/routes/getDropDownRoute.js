var express = require('express');
var router = express.Router();
const DAO = require("../DAO/getDropDownDAO")


router.get('/getArea', function (req, res, next) {

	var respDB = DAO.GetLocationDataByArea(function (data) {
		//console.log("GetLocationDataByArea COUNT :", data)
		res.json(data)
	})
});

router.get('/getCity', function (req, res, next) {

	var respDB = DAO.GetLocationDataByCity(function (data) {
		//console.log("GetLocationDataByCity COUNT :", data)
		res.json(data)
	})
});

router.get('/getCountry', function (req, res, next) {

	var respDB = DAO.GetLocationDataByCountry(function (data) {
		//console.log("GetLocationDataByCountry COUNT :", data)
		res.json(data)
	})
});

router.get('/getDepartment', function (req, res, next) {

	var respDB = DAO.GetDepartmentData(function (data) {
		//console.log("GetDepartmentData COUNT :", data)
		res.json(data)
	})
});

router.get('/getClient', function (req, res, next) {

	var respDB = DAO.GetClientData(function (data) {
		//console.log("GetClientData COUNT :", data)
		res.json(data)
	})
});

router.get('/getPrimarySkill', function (req, res, next) {

	var respDB = DAO.GetPrimarySkillData(function (data) {
		//console.log("GetPrimarySkillData COUNT :", data)
		res.json(data)
	})
});

router.get('/getSecondarySkill', function (req, res, next) {

	var respDB = DAO.GetSecondarySkillData(function (data) {
		//console.log("GetSecondarySkillData COUNT :", data)
		res.json(data)
	})
});

router.get('/getDomain', function (req, res, next) {

	var respDB = DAO.GetDomainData(function (data) {
		//console.log("GetDomainData COUNT :", data)
		res.json(data)
	})
});

router.get('/getRmgProjectData', function(req, res, next) {

	var respDB=DAO.GetRmgProjectData(function(data){
	//console.log("GetRmgProjectData COUNT :",data)
  	res.json(data)
})
});


//////////////   USER DROPDOWN STARTS FORM HERE  ///////////////////////////////


router.get('/getProjectManager', function(req, res, next) {

	var respDB=DAO.ProjectManagerNameData(function(data){
	//console.log("ProjectManagerNameData  :",data)
  	res.json(data)
})
});

router.get('/getAccountOwner', function(req, res, next) {

	var respDB=DAO.AccountOwnerNameData(function(data){
	//console.log("AccountOwnerNameData  :",data)
  	res.json(data)
})
});

router.get('/getDeliveryOwner', function(req, res, next) {

	var respDB=DAO.DeliveryOwnerNameData(function(data){
	//console.log("DeliveryOwnerNameData  :",data)
  	res.json(data)
})
});

router.get('/getFinanceOwner', function(req, res, next) {

	var respDB=DAO.FinanceOwnerNameData(function(data){
	//console.log("FinanceOwnerNameData  :",data)
  	res.json(data)
})
});

router.get('/getRMG', function(req, res, next) {

	var respDB=DAO.RMGNameData(function(data){
	//console.log("RMGNameData  :",data)
  	res.json(data)
})
});


router.get('/getHR', function(req, res, next) {

	var respDB=DAO.HRNameData(function(data){
	//console.log("HRNameData  :",data)
  	res.json(data)
})
});
/////////////////////////////////   PROJECT PER MANAGER   /////////////////////////////////


router.get('/managerProject', function(req, res, next) {

	var respDB=DAO.ProjectPerManager(req.query.id,function(data){
	//console.log("Project Manager ID  :",req.params.id)
  	res.json(data)
})
});
module.exports = router;
