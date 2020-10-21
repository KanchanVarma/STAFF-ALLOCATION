var express = require('express');
var router = express.Router();
const DAO = require("../DAO/deliveryDashboardDAO")

router.get('/myProject', function (req, res, next) {
	var respDB = DAO.MyProjectsData(req.query.user_id,function (data) {
		//console.log("Inside Route Example COUNT :", data)
		res.json(data)
	})
});

router.get('/myResource', function (req, res, next) {
	
	var respDB = DAO.MyResourcesData(req.query.user_id,function (data) {
		//console.log("Inside Route Example COUNT :", data)
		res.json(data)
	})
});

router.get('/newProject', function (req, res, next) {
	var respDB = DAO.NewProjectData(req.query.user_id,function (data) {
		//console.log("Inside Route Example COUNT :", data)
		res.json(data)
	})
});

router.get('/projectClosingIn15Days', function (req, res, next) {
	var respDB = DAO.ProjectClosingIn15DaysData(req.query.user_id,function (data) {
		//console.log("Inside Route Example COUNT :", data)
		res.json(data)
	})
});

router.get('/resourceReleasingIn15Days', function (req, res, next) {
	var respDB = DAO.ResourceReleasingIn15DaysData(req.query.user_id,function (data) {
		//console.log("Inside Route Example COUNT :", data)
		res.json(data)
	})
});

router.get('/projectStartingIn15Days', function (req, res, next) {
	var respDB = DAO.ProjectStartingIn15DaysData(req.query.user_id,function (data) {
		//console.log("Inside Route Example COUNT :", data)
		res.json(data)
	})
});
router.get('/calender', function(req, res, next) {

	var respDB=DAO.ResourceCalenderData(function(data){

	//console.log("Inside Route Example COUNT :",data)
  	res.json(data)
})
});



module.exports = router;
