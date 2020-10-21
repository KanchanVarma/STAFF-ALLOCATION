var express = require('express');
var router = express.Router();
const DAO = require("../DAO/hr_finance_DashboardDAO")




router.get('/hr', function(req, res, next) {

	var respDB=DAO.HrDashboardData(req.query.id,function(data){

	//console.log("Inside HrDashboardData DATA :",data)
  	res.json(data)
})
});

router.get('/finance', function(req, res, next) {
	var respDB=DAO.FinanceDashboardData(req.query.id,function(data){
	//console.log("Inside HrDashboardData DATA -------------------- :",req.query.id)
  	res.json(data)
})
});




module.exports = router;