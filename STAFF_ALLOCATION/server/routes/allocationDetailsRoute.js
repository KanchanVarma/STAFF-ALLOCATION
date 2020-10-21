var express = require('express');
var router = express.Router();
const DAO = require("../DAO/allocationDetailsDAO")




router.get('/resource', function(req, res, next) {

	var respDB=DAO.AllocationDetailsForResource(req.query.id,function(data){
	//console.log("AllocationDetailsForResource Route Example COUNT :",data)
  	res.json(data)
})
});

router.get('/project', function(req, res, next) {

	var respDB=DAO.AllocationDetailsForProject(req.query.id,function(data){
	//console.log("AllocationDetailsForProject Route Example COUNT :",data)
  	res.json(data)
})
});



module.exports = router;