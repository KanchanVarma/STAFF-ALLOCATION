var express = require('express');
var router = express.Router();
const DAO = require("../DAO/requestNewHireDAO")



router.post('/create', function(req, res, next) {

	var respDB=DAO.InsertRequestNewHire(req.body,function(data){
	//console.log("Inside InsertRequestNewHire COUNT :",req.params.id)
  	res.json({message:'successs',code:0 ,data:{id:data[0][0].id}})
})
});



router.put('/update', function(req, res, next) {

	var respDB=DAO.UpdateRequestNewHire(req.query.id,req.body,function(data){

	//console.log("Inside UpdateRequestNewHire ID :",req.params.id)
  	res.json({message:'successs',code:0})
})
});


router.get('/select', function(req, res, next) {

	var respDB=DAO.SelectRequestNewHireById(req.query.id,function(data){
	console.log("SelectRequestNewHireById DATA :",data)
  	res.json(data)
})
});

module.exports = router;
