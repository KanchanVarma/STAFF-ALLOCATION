var express = require('express');
var router = express.Router();
const DAO = require("../DAO/allocateResourceDAO")
// const DAO1 = require("../DAO/searchResourceDAO")




router.post('/', function (req, res, next) {


	var reqData = req.body
	var respDB = DAO.InsertAllocateResourceDirect(reqData, function (data,code,errMsg) {

        console.log("Inside InsertAllocateResourceDirect")

		if (code==0){
			// console.log("INSERTED", data)
			console.log("Inside Code 0......")
			res.json({ message: errMsg, code: 0 })
		}

		if (code==1){
			console.log("Inside Code 1......")
			res.json({ message: errMsg, code: 1 })
		}
		if (code==2){
			console.log("Inside Code 2......")
			res.json({ message: errMsg, code: 2 })
		}
		


	})
});

module.exports = router;