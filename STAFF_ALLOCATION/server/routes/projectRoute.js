var express = require('express');
var router = express.Router();
const DAO = require("../DAO/projectDAO")
const auditDataLog = require('../services/auditDataLogService')




router.post('/create', function (req, res, next) {


	var reqData = req.body
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	console.log("date : ",day,"/",month,"/",year)

	console.log("Project Name :",req.body.name)

	if (req.body.name=='COE'){

		res.json({ message: "Not allowed to create project COE", code: 1 })

	} else {
			var respDB = DAO.CreateProject(reqData, function (data,code,errMsg) {
				if (code==1){
					res.json({ message: errMsg, code: 1 })
				}
				if(code==0){
					res.json({ message: 'successs', code: 0,data:data.id })
				}
				})
    }

});





router.put('/update', function (req, res, next) {
	var reqData = req.body
	var respDB = DAO.UpdateProject(req.query.id, reqData, function (data,code,errMsg) {
		if (code==1){
			res.json({ message: errMsg, code: 1 })
		}
		if(code==0){
			console.log("Inside UpdateProject COUNT :", req.query.id)
			res.json({ message: 'successs', code: 0 })
		}

	})
});



router.get('/select', function (req, res, next) {
	// console.log(req.query.id,req.query)
	var respDB = DAO.SelectProjectById(req.query.id, function (data) {
		console.log("SelectProjectById COUNT :", data)
		res.json(data)
	})
});

router.post('/search', function (req, res, next) {

	console.log(res.body)
	var respDB = DAO.SearchProject(req.body, function (data,count) {
		console.log("Inside Route SearchProject :", count)
		res.json(data)
	})
});


module.exports = router;
