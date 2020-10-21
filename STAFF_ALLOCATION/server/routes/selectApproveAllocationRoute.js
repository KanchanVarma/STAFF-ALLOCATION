var express = require('express');
var router = express.Router();
const DAO = require("../DAO/selectApproveAllocationDAO")




router.get('/', function(req, res, next) {

	var respDB=DAO.SelectProjectAllocationData(req.query.id,function(data){
	//console.log("SelectProjectAllocationQuery Route Example COUNT :",data)
  	res.json(data)
})
});


module.exports = router;