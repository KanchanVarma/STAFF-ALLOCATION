var express = require('express');
var router = express.Router();
const DAO = require("../DAO/resourceDAO")
// const DAO1 = require("../DAO/searchResourceDAO")




router.post('/create', function (req, res, next) {


	 var reqData = req.body
	var respDB = DAO.CreateResource(reqData, function (data,code,errMsg) {
		if (code==1){
			res.json({ message: errMsg, code: 1 })
		}
		if(code==0){
		res.json({ message: 'successs', code: 0, data:data[0][0] })
		}
	})
});



// router.post('/search', function (req, res, next) {
// 	var respDB = DAO1.SearchResourceData(req, function (data) {
// 		console.log("Inside Route Example COUNT :", data)
// 		res.json(data)
// 	})
// });


router.post('/update', function (req, res, next) {


	var reqData = req.body
	var respDB = DAO.UpdateResource(req.params.id, reqData, function (data,code,errMsg) {

		if (code==1){
			res.json({ message: errMsg, code: 1 })
		}
		 
		if(code==0){
			res.json({ message: 'successs', code: 0 })
		}
		//console.log("Inside UpdateResource COUNT :", req)
		
	})
});



router.get('/', function (req, res, next) {

	var respDB = DAO.SelectResourceById(req.query.id, function (data) {
		console.log("SelectResourceById COUNT :", data)
		res.json(data)
	})
});


module.exports = router;
