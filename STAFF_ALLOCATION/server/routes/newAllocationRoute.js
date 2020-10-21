var express = require('express');
var router = express.Router();
const DAO = require("../DAO/allocateResourceDAO")
// const DAO1 = require("../DAO/searchResourceDAO")




router.post('/', function (req, res, next) {


	 var reqData = req.body
	var respDB = DAO.InsertAllocateResourceDirect(reqData, function (data,code,errMsg) {

		if (code==1){
			console.log("Inside Code 1......")
			res.json({ message: errMsg, code: 1 })
		}
		if (code==0){
			//console.log("Inside Route Example COUNT :", req)
			res.json({ message: 'successs', code: 0, data:data[0][0] })
		}


	})
});

module.exports = router;