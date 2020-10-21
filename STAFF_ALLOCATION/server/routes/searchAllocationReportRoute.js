var express = require('express');
var router = express.Router();
const DAO = require("../DAO/searchAllocationReportDAO")




router.post('/', function(req, res, next) {



	var respDB=DAO.SearchAllocationReport(req.body,function(data){
	//console.log("SearchAllocationReportQuery Route Example COUNT :",data)
  	res.json(data)
})
});


module.exports = router;