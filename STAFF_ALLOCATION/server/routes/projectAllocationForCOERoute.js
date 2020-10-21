var express = require('express');
var router = express.Router();
const DAO = require("../DAO/projectAllocationForCOEDAO")




router.get('/', function (req, res, next) {
	var respDB = DAO.ProjectAllocationForCOE( function (data) {
		//console.log("Inside ProjectAllocationForCOE :", data)
		res.json(data)
	})
});

module.exports = router;