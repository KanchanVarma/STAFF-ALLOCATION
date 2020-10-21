var express = require('express');
var router = express.Router();
const DAO = require("../DAO/editAllocationDetailsDAO")

router.put('/directAllocate', function (req, res, next) {

	var respDB = DAO.DirectEditAllocationDetails(req.body, function (result,metadata,code,errorMsg) {
		console.log("Inside Route Example COUNT :")
		
		console.log("code ......",code)
		console.log("message ....",errorMsg)
		

		if (code==0){
			// console.log("INSERTED", data)
			console.log("Inside Code 0......")
			res.json({ message: errorMsg, code: 0 })
		}

		if (code==1){
			console.log("Inside Code 1......")
			res.json({ message: errorMsg, code: 1 })
		}
		if (code==2){
			console.log("Inside Code 2......")
			res.json({ message: errorMsg, code: 2 })
		}
		
	})
});


module.exports = router;